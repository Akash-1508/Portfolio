import React, { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps a section with optional scroll-triggered reveal (children get .section-reveal-child by default).
 */
export default function SectionWrapper({
  id,
  as: Tag = "section",
  className = "",
  children,
  reveal = true,
  revealSelector = ".section-reveal-child",
  scrollStart = "top 82%",
}) {
  const ref = useRef(null);
  const uid = useId();

  useEffect(() => {
    if (!reveal || !ref.current) return;
    const root = ref.current;
    const els = root.querySelectorAll(revealSelector);
    if (!els.length) return;

    const ctx = gsap.context(() => {
      gsap.from(els, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          id: `sw-${uid}`,
          trigger: root,
          start: scrollStart,
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reveal, revealSelector, scrollStart, uid]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
