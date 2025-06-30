import { cn } from "@/lib/utils";
import MintContentLeftPage from "./mint-content-left";
import MintContentRightPage from "./mint-content-right";

type MintContentProps = {
  className?: string;
  storyNumber?: number;
  storyTitle?: string;
  storyImage?: string;
  totalMinted?: number;
  currentPage?: number;
  totalPages?: number;
  minting?: boolean;
  loading?: boolean;
  endDate?: string;
  maximumLlamaoPerWallet?: number;
  description?: string;
};

export default function MintContent({
  className = "",
  storyNumber = 1,
  storyTitle = "Llamao’s Last Supper",
  storyImage = "/gifs/llamao_last_supper.gif",
  totalMinted = 0,
  currentPage = 1,
  totalPages = 10,
  minting = false,
  loading = false,
  endDate,
  maximumLlamaoPerWallet,
  description,
}: MintContentProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-0 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto items-stretch justify-center",
        className
      )}
    >
      {/* left page */}
      <div className="flex items-center justify-center">
        <MintContentLeftPage
          storyNumber={storyNumber}
          storyTitle={storyTitle}
          storyImage={storyImage}
          totalMinted={totalMinted}
          currentPage={currentPage}
          totalPages={totalPages}
          minting={minting}
          loading={loading}
        />
      </div>
      {/* right page */}
      <div className="flex items-center justify-center">
        <MintContentRightPage
          endDate={endDate}
          maximumLlamaoPerWallet={maximumLlamaoPerWallet}
          description={description}
        />
      </div>
    </div>
  );
}
