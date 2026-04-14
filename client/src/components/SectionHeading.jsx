import React from "react";

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center section-heading">
      {eyebrow ? (
        <p className="font-secondary text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-primary text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 font-secondary text-base leading-relaxed text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
