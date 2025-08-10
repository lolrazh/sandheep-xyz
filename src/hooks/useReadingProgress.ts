import { useEffect, useState } from "react";

export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculate = () => {
      const doc = document.documentElement;
      const scrollTop = Math.max(doc.scrollTop || document.body.scrollTop || 0, 0);
      const scrollHeight = Math.max(doc.scrollHeight || document.body.scrollHeight || 0, 0);
      const clientHeight = Math.max(window.innerHeight || 0, 0);
      const maxScrollable = Math.max(scrollHeight - clientHeight, 1);
      let value = scrollTop / maxScrollable;
      if (!Number.isFinite(value)) value = 0;
      value = Math.min(Math.max(value, 0), 1);
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