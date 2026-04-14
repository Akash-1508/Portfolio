import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={[
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] text-[var(--color-text-primary)] backdrop-blur-xl transition hover:border-[var(--color-accent)]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60",
        className,
      ].join(" ")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -40, opacity: 0.5 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="material-symbols-outlined text-[22px]"
      >
        {isDark ? "light_mode" : "dark_mode"}
      </motion.span>
    </button>
  );
}
