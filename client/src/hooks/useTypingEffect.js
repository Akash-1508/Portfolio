import { useEffect, useState } from "react";

/**
 * Loops through phrases with type / delete animation.
 * Keep `phrases` reference stable (e.g. import from constants) to avoid resets.
 */
export function useTypingEffect(phrases, {
  typingSpeed = 72,
  deletingSpeed = 42,
  pauseMs = 2100,
  pauseBetweenPhrasesMs = 520,
} = {}) {
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing");
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (!phrases?.length) {
      setDisplay("");
      return;
    }

    const current = phrases[phraseIndex % phrases.length];
    let timeoutId;

    if (phase === "typing") {
      if (display.length < current.length) {
        timeoutId = window.setTimeout(() => {
          setDisplay(current.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        timeoutId = window.setTimeout(() => setPhase("pausing"), pauseMs);
      }
    } else if (phase === "pausing") {
      timeoutId = window.setTimeout(() => setPhase("deleting"), pauseBetweenPhrasesMs);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timeoutId = window.setTimeout(() => {
          setDisplay((d) => d.slice(0, -1));
        }, deletingSpeed);
      } else {
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
      }
    }

    return () => window.clearTimeout(timeoutId);
  }, [
    display,
    phase,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseMs,
    pauseBetweenPhrasesMs,
  ]);

  return display;
}
