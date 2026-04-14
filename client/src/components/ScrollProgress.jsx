import React, { useEffect, useState } from "react";
import { useSmoothScroll } from "../context/SmoothScrollContext";

export default function ScrollProgress() {
  const { lenisRef, ready } = useSmoothScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const lenis = lenisRef.current;
    if (!lenis) return;

    const onScroll = (instance) => {
      setProgress(instance.progress ?? 0);
    };

    const unsub = lenis.on("scroll", onScroll);
    onScroll(lenis);

    return () => {
      if (typeof unsub === "function") unsub();
      else lenis.off?.("scroll", onScroll);
    };
  }, [lenisRef, ready]);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[90] h-[3px] w-full bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left rounded-r-full bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-[var(--color-accent-warm)] transition-[transform] duration-75 ease-out"
        style={{ transform: `scaleX(${progress})`, width: "100%" }}
      />
    </div>
  );
}
