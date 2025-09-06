import React from "react";
import { useReadingProgress } from "@/hooks/useReadingProgress";

type ReadingProgressBarProps = {
  withinHeader?: boolean;
  active?: boolean;
};

export function ReadingProgressBar({ withinHeader = false, active = true }: ReadingProgressBarProps): React.JSX.Element {
  const progress = useReadingProgress(active);

  const containerClass = withinHeader
    ? "w-full h-[2px] overflow-hidden"
    : "sticky top-[var(--header-height,0px)] z-60 h-[2px] overflow-hidden";

  return (
    <div className={containerClass} aria-hidden="true">
      <div
        className={[
          "h-full bg-foreground origin-left will-change-transform",
          active
            ? "md:transition-transform md:duration-75 md:ease-linear"
            : "transition-none",
          active ? (progress > 0 ? "opacity-100" : "opacity-0") : "opacity-0",
          "motion-reduce:transition-none",
        ].join(" ")}
        style={{ transform: `scaleX(${active ? progress : 0})` }}
      />
    </div>
  );
}