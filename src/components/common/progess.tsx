import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number; // current progress value
  max: number; // maximum value
  label?: string; // optional label to show on the left
  percentLabel?: string; // optional label to show on the right
  className?: string;
  barClassName?: string;
  color?: string; // bar color
  bgColor?: string; // background color
  height?: string | number; // bar height
};

export default function Progress({
  value,
  max,
  label,
  percentLabel,
  className,
  barClassName,
  color = "#D7B594",
  bgColor = "#AD7757",
  height = "0.5rem",
}: ProgressProps) {
  const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between w-full px-1">
        {label && (
          <p className="text-[9px] sm:text-sm text-[#CF573C] font-pp-mondwest">
            {label}
          </p>
        )}
        <span className="text-[9px] sm:text-sm text-[#B2A280] font-pp-mondwest">
          {percentLabel ? percentLabel : `${percent.toFixed(2)}%`}
        </span>
      </div>
      <div
        className="mx-2 relative overflow-hidden"
        style={{ background: bgColor, height }}
      >
        <div
          className={cn("h-full transition-all duration-500", barClassName)}
          style={{ width: `${percent}%`, background: color }}
        />
      </div>
    </div>
  );
}
