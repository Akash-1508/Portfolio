import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PageLoader({ onComplete }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const labelRef = useRef(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onComplete?.();
      }
      return;
    }

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onComplete?.();
    };

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: finish,
    });

    tl.fromTo(
      barRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.9 }
    )
      .fromTo(
        labelRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35 },
        "-=0.5"
      )
      .to(barRef.current, { scaleX: 0, transformOrigin: "right center", duration: 0.45 }, "+=0.15")
      .to(
        rootRef.current,
        {
          opacity: 0,
          duration: 0.5,
          pointerEvents: "none",
          onComplete: () => {
            if (rootRef.current) rootRef.current.style.visibility = "hidden";
          },
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-[var(--color-bg-primary)]"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <p
        ref={labelRef}
        className="font-primary text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-text-secondary)]"
      >
        Loading
      </p>
      <div className="h-px w-48 overflow-hidden rounded-full bg-[var(--color-border)]">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)]"
        />
      </div>
    </div>
  );
}
