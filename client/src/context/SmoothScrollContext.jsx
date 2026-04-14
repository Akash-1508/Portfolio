import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Expo ease-out — close to Lenis defaults, slightly smoother stop */
export const LENIS_EASING = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

const KEYBOARD_SCROLL_DURATION = 0.88;
const WHEEL_FLASH_MIN_DELTA = 4;
const WHEEL_FLASH_INTERVAL_MS = 90;
let scrollFlashClearTimer = 0;

function maxScrollY(lenis) {
  const lim = lenis.limit;
  if (lim && typeof lim === "object") return Math.max(0, lim.y ?? 0);
  if (typeof lim === "number") return Math.max(0, lim);
  return Math.max(0, (document.documentElement?.scrollHeight ?? 0) - window.innerHeight);
}

function clampScrollY(lenis, y) {
  return Math.max(0, Math.min(maxScrollY(lenis), y));
}

function isTypingTarget(el) {
  if (!el || !(el instanceof Element)) return false;
  if (el.isContentEditable) return true;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.closest?.('[contenteditable="true"]')) return true;
  return false;
}

function isSpaceBlockedTarget(el) {
  if (!el || !(el instanceof Element)) return false;
  return !!el.closest?.(
    'button, a[href], summary, [role="button"], [role="link"], [role="menuitem"], input, select, textarea, [data-lenis-prevent]'
  );
}

function flashScrollDirection(direction) {
  const root = document.documentElement;
  root.removeAttribute("data-scroll-flash");
  // Reflow so repeated same-direction flashes retrigger CSS animation
  void root.offsetWidth;
  root.setAttribute("data-scroll-flash", direction);
  window.clearTimeout(scrollFlashClearTimer);
  scrollFlashClearTimer = window.setTimeout(() => root.removeAttribute("data-scroll-flash"), 520);
}

const SmoothScrollContext = createContext(null);

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setReady(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.35,
      easing: LENIS_EASING,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 1.05,
      infinite: false,
    });

    lenisRef.current = lenis;
    setReady(true);

    const onLenisScroll = (instance) => {
      ScrollTrigger.update();
      const p = typeof instance.progress === "number" ? instance.progress : 0;
      document.documentElement.style.setProperty("--lenis-progress", String(p));
      const v = typeof instance.velocity === "number" ? instance.velocity : 0;
      const signed = Math.max(-120, Math.min(120, v));
      document.documentElement.style.setProperty("--lenis-velocity-signed", String(signed));
      document.documentElement.style.setProperty("--lenis-velocity", String(Math.min(120, Math.abs(v))));
    };

    lenis.on("scroll", onLenisScroll);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize, { passive: true });

    ScrollTrigger.refresh();
    onLenisScroll(lenis);

    let lastWheelFlashAt = 0;
    const onWheelFlash = (e) => {
      if (e.target instanceof Element && e.target.closest("[data-lenis-prevent]")) return;
      if (Math.abs(e.deltaY) < WHEEL_FLASH_MIN_DELTA) return;
      const now = performance.now();
      if (now - lastWheelFlashAt < WHEEL_FLASH_INTERVAL_MS) return;
      lastWheelFlashAt = now;
      flashScrollDirection(e.deltaY > 0 ? "down" : "up");
    };
    window.addEventListener("wheel", onWheelFlash, { passive: true, capture: true });

    const stepArrow = () => Math.max(120, window.innerHeight * 0.12);

    const onKeyScroll = (e) => {
      if (e.target instanceof Element && e.target.closest("[data-lenis-prevent]")) return;
      if (isTypingTarget(e.target)) return;

      const key = e.key;
      const isSpace = key === " " || key === "Spacebar";
      if (isSpace && isSpaceBlockedTarget(e.target)) return;

      const downKeys = ["ArrowDown", "PageDown", "End"];
      const upKeys = ["ArrowUp", "PageUp", "Home"];
      if (!downKeys.includes(key) && !upKeys.includes(key) && !isSpace) return;

      e.preventDefault();

      const maxY = maxScrollY(lenis);
      let next = lenis.scroll;
      const vh = window.innerHeight;

      if (key === "Home" || key === "End") {
        next = key === "Home" ? 0 : maxY;
        flashScrollDirection(key === "Home" ? "up" : "down");
      } else if (key === "PageDown") {
        next = lenis.scroll + vh * 0.92;
        flashScrollDirection("down");
      } else if (key === "PageUp") {
        next = lenis.scroll - vh * 0.92;
        flashScrollDirection("up");
      } else if (isSpace) {
        next = lenis.scroll + vh * 0.9 * (e.shiftKey ? -1 : 1);
        flashScrollDirection(e.shiftKey ? "up" : "down");
      } else if (key === "ArrowDown") {
        next = lenis.scroll + stepArrow();
        flashScrollDirection("down");
      } else if (key === "ArrowUp") {
        next = lenis.scroll - stepArrow();
        flashScrollDirection("up");
      }

      lenis.scrollTo(clampScrollY(lenis, next), {
        duration: KEYBOARD_SCROLL_DURATION,
        easing: LENIS_EASING,
      });
    };
    window.addEventListener("keydown", onKeyScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheelFlash, true);
      window.removeEventListener("keydown", onKeyScroll);
      window.clearTimeout(scrollFlashClearTimer);
      document.documentElement.removeAttribute("data-scroll-flash");
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.style.removeProperty("--lenis-progress");
      document.documentElement.style.removeProperty("--lenis-velocity");
      document.documentElement.style.removeProperty("--lenis-velocity-signed");
      ScrollTrigger.refresh();
      setReady(false);
    };
  }, []);

  const scrollTo = useCallback((target, options = {}) => {
    const lenis = lenisRef.current;
    const { duration = 1.55, easing = LENIS_EASING, offset = 0, ...rest } = options;

    if (!lenis) {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    lenis.scrollTo(target, {
      offset,
      duration,
      easing,
      ...rest,
    });
  }, []);

  const value = {
    scrollTo,
    lenisRef,
    ready,
  };

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  return ctx;
}
