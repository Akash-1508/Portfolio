import React from "react";

export default function SecondaryButton({ as: As = "a", className = "", ...props }) {
  return (
    <As
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3",
        "font-secondary text-sm font-semibold text-[var(--btn-secondary-text)]",
        "border border-[var(--btn-secondary-border)] bg-[var(--btn-secondary-bg)] backdrop-blur-xl",
        "shadow-[var(--btn-secondary-shadow)]",
        "transition hover:border-[var(--color-accent)]/45 hover:bg-[var(--btn-secondary-hover-bg)] hover:shadow-[var(--btn-secondary-shadow)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
