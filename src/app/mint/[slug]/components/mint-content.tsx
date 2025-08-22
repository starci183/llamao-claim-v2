import type { NFTMetadata } from "@/lib/nft-utils";
import MintContentLeftPage from "./mint-content-left";
import MintContentRightPage from "./mint-content-right";

export default function MintContent({
  nftMetadata,
  totalMinted,
}: {
  nftMetadata: NFTMetadata;
  totalMinted: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-1 xs:gap-2 sm:gap-4 md:gap-6 w-full h-full mx-auto items-stretch justify-center">
      {/* left page */}
      <div className="flex items-center justify-center min-w-0">
        <MintContentLeftPage
          storyImage={nftMetadata?.image}
          storyTitle={nftMetadata?.name}
          totalMinted={totalMinted}
          totalSupply={nftMetadata?.totalSupply as number}
        />
      </div>
      {/* right page */}
      <div className="flex items-center justify-center min-w-0">
        <MintContentRightPage
          description={nftMetadata?.description}
          maximumLlamaoPerWallet={1}
          TBA={nftMetadata?.TBA as string}
        />
      </div>
    </div>
  );
}
