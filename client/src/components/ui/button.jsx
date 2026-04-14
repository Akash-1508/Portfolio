import React from "react";
import { motion } from "framer-motion";

const variants = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-secondary text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] shadow-[0_12px_40px_rgba(124,156,255,0.28)] transition hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/70 disabled:pointer-events-none disabled:opacity-50",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-secondary text-sm font-semibold text-[var(--color-text-primary)] border border-[var(--color-glass-border)] bg-[var(--color-glass)] backdrop-blur-xl transition hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-bg-elevated)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60",
};

export function Button({
  variant = "primary",
  as = "button",
  motionProps = {},
  className = "",
  children,
  ...rest
}) {
  const Component = as;
  const base = variants[variant] || variants.primary;

  if (motionProps && Object.keys(motionProps).length) {
    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} {...motionProps}>
        <Component className={[base, className].join(" ")} {...rest}>
          {children}
        </Component>
      </motion.div>
    );
  }

  return (
    <Component className={[base, className].join(" ")} {...rest}>
      {children}
    </Component>
  );
}
