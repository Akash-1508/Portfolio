import React from "react";
import { motion } from "framer-motion";

export function Card({ className = "", children, hover = true, glass = true, ...props }) {
  const base = glass
    ? "rounded-[28px] border border-[var(--color-glass-border)] bg-[var(--color-glass)] backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)]"
    : "rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]";

  if (hover) {
    return (
      <motion.div
        className={[base, className].join(" ")}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={[base, className].join(" ")} {...props}>
      {children}
    </div>
  );
}
