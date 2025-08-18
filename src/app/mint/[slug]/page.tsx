"use client";

import Loading from "@/components/common/loading";
import { StepNavigator } from "@/components/common/step-navigator";
import { useContract } from "@/hooks/use-contract";
import { useNftMetadata } from "@/hooks/use-nft-meta-data";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { BookContainer } from "./components/book/book-container";
import MintButton from "./components/mint-button";
import MintContent from "./components/mint-content";
import {
  MONAD_CONTRACT_ADDRESSES,
  type MonadContractAddress,
} from "@/contance";

export default function MintPage() {
  const router = useRouter();
  const { slug } = useParams();

  // Normalize slug and resolve index in your addresses array
  const address = useMemo(() => String(slug ?? ""), [slug]);
  const currentIndex = useMemo(() => {
    const idx = MONAD_CONTRACT_ADDRESSES.findIndex((a) => a === address);
    return idx === -1 ? 0 : idx;
  }, [address]);

  const nextIndex = (currentIndex + 1) % MONAD_CONTRACT_ADDRESSES.length;
  const prevIndex =
    (currentIndex - 1 + MONAD_CONTRACT_ADDRESSES.length) %
    MONAD_CONTRACT_ADDRESSES.length;

  const nextAddress = MONAD_CONTRACT_ADDRESSES[
    nextIndex
  ] as MonadContractAddress;
  const prevAddress = MONAD_CONTRACT_ADDRESSES[
    prevIndex
  ] as MonadContractAddress;

  const goToIndex = useCallback(
    (i: number) => {
      const len = MONAD_CONTRACT_ADDRESSES.length;
      const normalized = ((i % len) + len) % len;
      const addr = MONAD_CONTRACT_ADDRESSES[normalized] as MonadContractAddress;
      router.push(`/mint/${addr}`);
    },
    [router]
  );

  const onNext = useCallback(
    () => goToIndex(currentIndex + 1),
    [goToIndex, currentIndex]
  );
  const onBack = useCallback(
    () => goToIndex(currentIndex - 1),
    [goToIndex, currentIndex]
  );

  // Prefetch adjacent routes for snappier UX
  useEffect(() => {
    router.prefetch(`/mint/${nextAddress}`);
    router.prefetch(`/mint/${prevAddress}`);
  }, [router, nextAddress, prevAddress]);

  // On-chain/info hook (you still use this for totalMinted etc.)
  const { totalMinted } = useContract(address);

  // ✅ IMPORTANT: pass the address to useNftMetadata so it calls /api/nft/<address>
  const { data: nftMetadata, loading } = useNftMetadata({ address });

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between w-full min-w-[290px] sm:min-w-[600px] md:min-w-[700px] min-h-[350px] sm:min-h-[550px] max-h-screen bg-no-repeat bg-cover bg-center overflow-hidden"
      )}
      style={{ backgroundImage: "url(/gifs/llamao_homepage.gif)" }}
    >
      <div
        className={cn(
          "relative mx-auto max-w-[550px] sm:max-w-[650px] md:max-w-[750px] lg:max-w-[850px] xl:max-w-[900px] aspect-square md:aspect-[4/3] w-full h-full flex items-center justify-center"
        )}
      >
        <BookContainer>
          <div
            className={cn(
              "relative max-w-full h-full flex items-center justify-center overflow-hidden"
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loading />
              </div>
            ) : (
              nftMetadata && (
                <MintContent
                  nftMetadata={nftMetadata}
                  totalMinted={Number(totalMinted) || 0}
                />
              )
            )}
          </div>
        </BookContainer>

        <div className="absolute bottom-0 px-2 py-2 mx-auto">
          <StepNavigator
            currentLabel="Llamao"
            mainButton={<MintButton />}
            onBack={onBack}
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  );
}
