import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import { useApp } from "../context/AppContext";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { experience } = useApp();
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
        x: -28,
        opacity: 0,
        stagger: 0.15,
        duration: 0.75,
        ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={rootRef} className="relative scroll-mt-28 py-16 sm:py-22">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Work Experience"
          subtitle="Leadership on CRM frontend delivery and strong collaboration across the stack."
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div
            className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-transparent md:left-[15px]"
            aria-hidden
          />
          <ol className="space-y-12">
            {experience.map((job) => (
              <li key={job.title + job.company} className="timeline-item relative pl-10 md:pl-12">
                <span
                  className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-accent)]/50 bg-[var(--color-bg-primary)] shadow-[0_0_24px_rgba(124,156,255,0.35)]"
                  aria-hidden
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                </span>
                <p className="font-secondary text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  {job.period}
                </p>
                <h3 className="mt-2 font-primary text-xl font-bold text-[var(--color-text-primary)]">{job.title}</h3>
                <p className="mt-1 font-secondary text-sm font-semibold text-[var(--color-text-secondary)]">
                  {job.company}
                </p>
                <p className="mt-3 font-secondary text-base leading-relaxed text-[var(--color-text-secondary)]">
                  {job.description}
                </p>
                {job.achievements?.length ? (
                  <div className="mt-5">
                    <p className="font-secondary text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                      Key achievements
                    </p>
                    <ul className="mt-3 space-y-2 font-secondary text-sm text-[var(--color-text-secondary)]">
                      {job.achievements.map((a) => (
                        <li key={a} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
