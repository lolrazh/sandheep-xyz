import React from "react";
import { useReadingProgress } from "@/hooks/useReadingProgress";

type ReadingProgressBarProps = {
  withinHeader?: boolean;
};

export function ReadingProgressBar({ withinHeader = false }: ReadingProgressBarProps): React.JSX.Element {
  const progress = useReadingProgress();

  const isTrivial = progress === 0 || Number.isNaN(progress);

  const containerClass = withinHeader
    ? "w-full h-[3px] bg-border/60"
    : "sticky top-[var(--header-height,0px)] z-50 h-[3px] bg-border/60";

  return (
    <div className={containerClass} aria-hidden="true">
      <div
        className={[
          "h-full origin-left bg-foreground will-change-transform",
          "transition-transform duration-xxs ease-standard",
          isTrivial ? "opacity-0" : "opacity-100",
          "motion-reduce:transition-none",
        ].join(" ")}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}