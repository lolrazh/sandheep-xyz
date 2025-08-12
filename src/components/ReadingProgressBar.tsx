import React from "react";
import { useReadingProgress } from "@/hooks/useReadingProgress";

type ReadingProgressBarProps = {
  withinHeader?: boolean;
  active?: boolean;
};

export function ReadingProgressBar({ withinHeader = false, active = true }: ReadingProgressBarProps): React.JSX.Element {
  const progress = useReadingProgress(active);

  const containerClass = withinHeader
    ? "w-full h-[3px] bg-border/60"
    : "sticky top-[var(--header-height,0px)] z-60 h-[3px] bg-border/60";

  return (
    <div className={containerClass} aria-hidden="true">
      <div
        className={[
          "h-full origin-left bg-foreground will-change-transform",
          active ? "transition-transform duration-xxs ease-standard" : "transition-none",
          active && progress > 0 ? "opacity-100" : active ? "opacity-0" : "opacity-20",
          "motion-reduce:transition-none",
        ].join(" ")}
        style={{ transform: `scaleX(${active ? progress : 1})` }}
      />
    </div>
  );
}