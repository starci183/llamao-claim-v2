import { Button } from "@/components/common/button";
import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";
import EnterButton from "./components/enter-button";

export default function MintPlaybook() {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 min-h-screen items-center justify-start">
      <Navbar navbarItems={items} />
      <MainLayout
        text="Playbook"
        subHeader={false}
        className="p-1 sm:p-2 lg:p-4"
        wrapperClassName="max-w-full sm:max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[70%] mx-auto"
      >
        <div className="relative w-full aspect-[690/606] max-h-[70vh] xs:max-h-[75vh] sm:max-h-[80vh] md:max-h-[85vh] min-h-[350px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] overflow-hidden">
          <Image
            src="/gifs/llamao_mintplaybook_background.gif"
            alt="llamao_about_background"
            width={690}
            height={606}
            className="w-full h-full object-cover"
            priority
            quality={100}
          />
          <div className="absolute top-1/6 inset-0 flex items-center justify-center p-2 sm:p-4">
            <div className="relative max-w-[550px] sm:max-w-[650px] md:max-w-[750px] lg:max-w-[850px] xl:max-w-[900px] aspect-[679px/402px] w-full">
              <Image
                alt="book_cover"
                src="/images/scroll_llamao.svg"
                width={679.7457885742188}
                height={402.11865234375}
                quality={100}
                priority
                className="w-full h-auto"
              />

              {/* llamao image text */}
              <div className="absolute top-0 left-0 -translate-x-1 -translate-y-24 sm:-translate-y-28 md:-translate-y-32 lg:-translate-y-36 text-center aspect-[452px/161px] w-full h-auto flex items-center justify-center">
                <Image
                  alt="llamao_text"
                  src="/images/llamao_logo_text.svg"
                  width={452}
                  height={161}
                  className="w-[65%] sm:w-[70%] md:w-[75%] lg:w-[80%] xl:w-[85%] h-auto"
                />
              </div>

              {/* name book */}
              {/* <div className="absolute bottom-[42%] lg:bottom-[43%] left-1/2 -translate-x-[45%] px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2.5 flex flex-col items-center">
                <span className="font-pp-mondwest text-[#7D4200] text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider">
                  PLAYBOOK
                </span>
                <span className="font-pp-mondwest text-[#7D4200] text-md sm:text-lg md:text-xl lg:text-2xl">
                  ~ how to be a llamao ~
                </span>
              </div> */}

              {/* Button */}
              <EnterButton link="/mint-playbook/mint-playbook-page" />
            </div>
          </div>
        </div>
      </MainLayout>
      <Button
        intent="gradient"
        className="px-4 py-1 sm:px-6 sm:py-2.5 md:px-8 md:py-2 min-w-[150px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] flex items-center justify-center text-sm sm:text-base md:text-lg"
        doubleIcon
        icon={
          <Image
            src="/gifs/llamao_zenmonad.gif"
            alt="llamao_zenmonad"
            width={24}
            height={24}
            quality={100}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          />
        }
      >
        Back to Portal
      </Button>
    </div>
  );
}
