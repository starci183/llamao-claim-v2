import MintContentLeftPage from "./mint-content-left";
import MintContentRightPage from "./mint-content-right";

export default function MintContent() {
  return (
    <div className="grid grid-cols-2 gap-0 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto items-stretch justify-center">
      {/* left page */}
      <div className="flex items-center justify-center">
        <MintContentLeftPage />
      </div>
      {/* right page */}
      <div className="flex items-center justify-center">
        <MintContentRightPage />
      </div>
    </div>
  );
}
