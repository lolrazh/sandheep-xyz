import React from "react";
import { useReadingProgress } from "@/hooks/useReadingProgress";

export function ReadingProgressBar(): React.JSX.Element {
  const progress = useReadingProgress();

  const isTrivial = progress === 0 || Number.isNaN(progress);
  const isComplete = progress >= 0.999;

  return (
    <div
      className="sticky top-0 z-50 h-[3px] bg-border/30"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      aria-hidden="true"
    >
      <div
        className={[
          "h-full origin-left bg-foreground will-change-transform",
          "transition-transform duration-xxs ease-standard",
          isComplete ? "opacity-0 transition-opacity duration-sm" : "opacity-100",
          isTrivial ? "opacity-0" : "",
          "motion-reduce:transition-none",
        ].join(" ")}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}