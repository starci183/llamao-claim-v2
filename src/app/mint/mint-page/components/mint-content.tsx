import MintContentLeftPage from "./mint-content-left";
import MintContentRightPage from "./mint-content-right";

export default function MintContent() {
  return (
    <div className="relative flex flex-row w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto items-center justify-center px-4 sm:px-6 md:px-8">
      {/* left page */}
      <div className="absolute top-20 -left-[32%] w-full h-full flex items-center justify-center">
        <MintContentLeftPage />
      </div>
      {/* right page */}
      <div className="absolute top-20 left-[41%] w-full h-full flex items-center justify-center">
        <MintContentRightPage />
      </div>
    </div>
  );
}
