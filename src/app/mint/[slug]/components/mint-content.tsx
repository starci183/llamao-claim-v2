import type { NftMetadata } from "@/hooks/use-contract";
import MintContentLeftPage from "./mint-content-left";
import MintContentRightPage from "./mint-content-right";

export default function MintContent({
  nftMetadata,
  totalMinted,
}: {
  nftMetadata: NftMetadata;
  totalMinted: number;
}) {
  console.log("nftMetadataasdfasdf", nftMetadata);
  return (
    <div className="grid grid-cols-2 gap-6 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto items-stretch justify-center">
      {/* left page */}
      <div className="flex items-center justify-center">
        <MintContentLeftPage
          storyImage={nftMetadata?.image}
          storyTitle={nftMetadata?.name}
          totalMinted={totalMinted}
        />
      </div>
      {/* right page */}
      <div className="flex items-center justify-center">
        <MintContentRightPage
          description={nftMetadata?.description}
          maximumLlamaoPerWallet={1}
          endDate={new Date().toLocaleDateString()}
        />
      </div>
    </div>
  );
}
