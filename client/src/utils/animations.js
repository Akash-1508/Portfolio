import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade/slide reveal when section enters viewport (ScrollTrigger once).
 */
export function createScrollReveal(
  scope,
  selector,
  {
    y = 40,
    duration = 0.85,
    stagger = 0.1,
    ease = "power3.out",
    start = "top 82%",
  } = {}
) {
  if (!scope) return () => {};
  const els = scope.querySelectorAll(selector);
  if (!els.length) return () => {};

  const tween = gsap.from(els, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: scope,
      start,
      once: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/**
 * Stagger lines that match selector inside root (for text split containers).
 */
export function staggerLines(root, lineSelector, options = {}) {
  if (!root) return () => {};
  const lines = root.querySelectorAll(lineSelector);
  if (!lines.length) return () => {};

  const tween = gsap.from(lines, {
    yPercent: 100,
    opacity: 0,
    duration: options.duration ?? 0.65,
    stagger: options.stagger ?? 0.06,
    ease: options.ease ?? "power3.out",
    delay: options.delay ?? 0,
    scrollTrigger: options.scrollTrigger ?? {
      trigger: root,
      start: "top 78%",
      once: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

export const fadeVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};
