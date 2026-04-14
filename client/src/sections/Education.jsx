import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import { useApp } from "../context/AppContext";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const { education } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".edu-card", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={ref} className="relative scroll-mt-28 py-16 sm:py-22">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[280px] w-[280px] rounded-full bg-[var(--color-accent-secondary)]/12 blur-[100px]" />

      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Education"
          subtitle="Academic foundation in computer science and continuous learning in software engineering."
        />

        <div className="mx-auto mt-12 grid max-w-2xl gap-4">
          {education.map((row) => (
            <div
              key={row.title + row.period}
              className="edu-card flex flex-col gap-1 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-0.5 text-[var(--color-accent)]">school</span>
                <div>
                  <p className="font-primary text-lg font-bold text-[var(--color-text-primary)]">{row.title}</p>
                  {row.institution ? (
                    <p className="mt-0.5 font-secondary text-sm text-[var(--color-text-secondary)]">{row.institution}</p>
                  ) : null}
                </div>
              </div>
              <p className="shrink-0 font-secondary text-sm font-semibold text-[var(--color-accent)] sm:text-right">
                {row.period}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
