import React from "react";

export default function SectionSkeleton({ label = "Loading section" }) {
  return (
    <div
      className="flex min-h-[min(420px,55vh)] w-full flex-col justify-center gap-4 rounded-[28px] border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-8 backdrop-blur-md"
      role="status"
      aria-label={label}
    >
      <div className="h-4 w-32 animate-pulse rounded-full bg-[var(--color-border)]" />
      <div className="h-10 max-w-md animate-pulse rounded-xl bg-[var(--color-border)]" />
      <div className="h-4 max-w-lg animate-pulse rounded-lg bg-[var(--color-border)]" />
      <div className="h-4 max-w-sm animate-pulse rounded-lg bg-[var(--color-border)]" />
    </div>
  );
}
