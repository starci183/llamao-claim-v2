import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ProgressBar from "../../components/progress-bar";

type MintPlaybookContentProps = {
  className?: string;
  storyNumber?: number;
  storyTitle?: string;
  storyImage?: string;
  totalMinted?: number;
  currentPage?: number;
  totalPages?: number;
  loading?: boolean;
  description?: string;
};
export default function MintPlaybookContent({
  className = "",
  storyNumber = 1,
  storyTitle = "Llamao’s Last Supper",
  storyImage = "/gifs/llamao_pagoda.gif",
  description,
  loading = false,
}: MintPlaybookContentProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center w-full h-full gap-1 relative",
        className
      )}
    >
      {/* image */}
      <div className="box-shadow-mint-playbook p-0.5">
        {loading ? (
          <Skeleton className="w-[120px] h-[120px] md:w-[168px] md:h-[168px]" />
        ) : (
          <Image
            src={storyImage}
            alt={storyTitle}
            width={168}
            height={168}
            className="max-w-[50px] max-h-[50px] sm:max-w-[108px] sm:max-h-[80px] md:max-w-[80px] md:max-h-[100px] lg:max-w-[120px] lg:max-h-[140px] aspect-[1/1] object-cover"
          />
        )}
      </div>
      <div className="bg-[#663931] w-[50px] md:w-[90px] h-[14px] sm:h-[18px] md:h-[22px] flex items-center justify-center">
        <p className="font-pp-mondwest text-[#FFC59B] text-[10px] md:text-md text-nowrap font-bold">
          Rule {storyImage ? `0${storyNumber}` : "01"}
        </p>
      </div>
      <div className="max-w-[120px] md:max-w-[250px] text-wrap">
        <span className="text-[#AD7757] font-pp-mondwest text-[8px] sm:text-[10px] md:text-xs">
          {description ? (
            <>
              {/* Mobile: truncate if > 120, Desktop (md+): truncate if > 200 */}
              <span className="block md:hidden">
                {description.length > 90 ? (
                  <>
                    {description.slice(0, 90)}
                    <span className="inline">
                      <span className="sr-only">{description.slice(90)}</span>
                      ...
                    </span>
                  </>
                ) : (
                  description
                )}
              </span>
              <span className="hidden md:block">
                {description.length > 200 ? (
                  <>
                    {description.slice(0, 200)}
                    <span className="inline">
                      <span className="sr-only">{description.slice(200)}</span>
                      ...
                    </span>
                  </>
                ) : (
                  description
                )}
              </span>
            </>
          ) : null}
        </span>
      </div>

      <div className="absolute bottom-[25%] sm:bottom-[22%] left-1/2 -translate-x-1/2 translate-y-1/2 min-w-[38%]">
        <ProgressBar value={84} />
      </div>

      {/* <div className="relative w-full max-w-[160px] sm:max-w-[230px] md:max-w-[250px] lg:max-w-[270px] h-auto flex items-center justify-center transition-all">
        <Image
          src="/images/llamao_description.svg"
          alt="llamao description"
          width={228.05084228515625}
          height={157.54237365722656}
          className="w-full h-auto pointer-events-none aspect-[228.05/157.54] object-contain"
        />
        <h5 className="absolute top-[10%] left-[30%] -translate-x-1/2 -translate-y-1/2 text-[8px] sm:text-sm md:text-md text-[#B2A280] font-pp-mondwest font-bold z-10 whitespace-nowrap">
          Rule {"01"}
        </h5>
        <p className="absolute top-[10%] left-[79%] -translate-x-1/2 -translate-y-1/2 text-[9px] text-[#B2A280] font-pp-mondwest font-bold z-10 whitespace-nowrap">
          {"64/64"}
        </p>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[90%] lg:-translate-y-[70%] text-[8px] sm:text-xs text-[#602C2C] font-pp-neuebit w-full px-8 sm:px-10 md:px-12 truncate max-w-[100vw] md:max-w-[120vw] whitespace-normal sm:max-w-full">
          {description ? (
            <span className="block lg:hidden">{description}</span>
          ) : (
            <span className="block lg:hidden">
              {description
              ? description.length > 80
                ? (
                <>
                  {description.slice(0, 80)}
                  <span className="inline">
                  <span className="sr-only">
                    {description.slice(80)}
                  </span>
                  ...
                  </span>
                </>
                )
                : description
              : (
                <>
                Trapped and outmatched, the Monanimals face their deadliest foe yet:
                Future Mongrod.
                <span className="inline">
                  <span className="sr-only">
                  With time running out and Chog captured, they must pull off a
                  desperate ambush or watch their efforts and world crumble.
                  </span>
                  ...
                </span>
                </>
              )
            </span>
          )}
          <span className="hidden lg:block">
            {description ||
              `Trapped and outmatched, the Monanimals face their deadliest foe yet:
            Future Mongrod. With time running out and Chog captured, they must pull off a desperate ambush or watch their efforts and world crumble.`}
          </span>
        </div>
        <Progress
          className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[80%] text-[8px] md:text-xs text-[#602C2C] font-pp-neuebit w-full px-8 sm:px-10 md:px-12 truncate max-w-[120vw] whitespace-normal sm:max-w-full"
          max={100}
          value={10}
          color="#E7D5B3"
          label="Total Minted"
        />
      </div> */}
    </div>
  );
}
