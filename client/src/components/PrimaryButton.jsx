import React from "react";

export default function PrimaryButton({ as: As = "a", className = "", ...props }) {
  return (
    <As
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3",
        "font-secondary text-sm font-semibold text-[var(--btn-primary-text)]",
        "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)]",
        "shadow-[var(--btn-primary-shadow)]",
        "transition hover:brightness-110 active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/70",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
