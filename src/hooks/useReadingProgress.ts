import { useEffect, useState } from "react";

export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculate = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight || document.body.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScrollable = Math.max(scrollHeight - clientHeight, 1);
      const value = Math.min(Math.max(scrollTop / maxScrollable, 0), 1);
      setProgress(value);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(calculate);
      }
    };

    const onResize = () => calculate();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", calculate);
    calculate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", calculate);
    };
  }, []);

  return progress;
}