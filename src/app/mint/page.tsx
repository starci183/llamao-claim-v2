import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";
import Link from "next/link";

export default function Mint() {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 min-h-screen items-center justify-start">
      <Navbar navbarItems={items} />
      <MainLayout
        text="Homepage"
        subHeader={false}
        className="p-1 sm:p-2 lg:p-4"
        wrapperClassName="max-w-full sm:max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[70%] mx-auto"
      >
        <div className="relative w-full aspect-[690/606] max-h-[70vh] xs:max-h-[75vh] sm:max-h-[80vh] md:max-h-[85vh] min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[600px] overflow-hidden">
          <Image
            src="/gifs/llamao_homepage.gif"
            alt="llamao_about_background"
            width={690}
            height={606}
            className="w-full h-full object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            <div className="relative max-w-[350px] sm:max-w-[450px] md:max-w-[520px] lg:max-w-[593px] aspect-[593px/506px] w-full">
              <Image
                alt="book_cover"
                src="/images/llamao_book_cover.svg"
                width={593}
                height={506}
                quality={100}
                priority
                className="w-full h-auto mt-3 sm:mt-4 md:mt-6 lg:mt-10"
              />

              {/* llamao image text */}
              <div className="absolute top-0 left-0 -translate-x-1 -translate-y-6 sm:-translate-y-9 md:-translate-y-12 text-center aspect-[452px/161px] w-full h-auto flex items-center justify-center">
                <Image
                  alt="llamao_text"
                  src="/images/llamao_logo_text.svg"
                  width={452}
                  height={161}
                  className="w-[65%] sm:w-[70%] md:w-[75%] lg:w-[80%] xl:w-[85%] h-auto"
                />
              </div>

              {/* current year label */}
              <div className="absolute top-[27%] sm:top-[28%] md:top-[29%] lg:top-[31%] left-1/2 -translate-x-1/2 ml-1.5 sm:ml-2 md:ml-2.5 px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2.5">
                <span className="font-pp-neuebit font-bold text-[#663931] text-2xl sm:text-3xl tracking-wider">
                  2025
                </span>
              </div>

              {/* name book */}
              <div className="absolute bottom-[44%] lg:bottom-[45%] left-1/2 -translate-x-[45%] px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2.5">
                <span className="font-pp-mondwest text-[#B2A280] text-3xl md:text-4xl tracking-wider">
                  LLAMAOISM
                </span>
              </div>

              {/* Button */}
              <div className="absolute bottom-0 left-[48%] -translate-x-1/2 -translate-y-full mb-2 sm:mb-3 md:mb-4 lg:mb-6 w-full flex items-center justify-center">
                <Link href={"/mint-page"}>
                  <Image
                    alt="llamao_enter_button"
                    src="/images/llamao_enter_button.svg"
                    width={134.4067840576172}
                    height={67.2033920288086}
                    className="w-[140%] sm:w-[150%] md:w-[160%] lg:w-[180%] h-auto cursor-pointer max-w-none"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
