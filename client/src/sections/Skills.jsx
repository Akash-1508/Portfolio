import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import { useApp } from "../context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const GROUP_META = {
  Frontend: { icon: "web" },
  Backend: { icon: "dns" },
  Database: { icon: "storage" },
  "Tools & Platforms": { icon: "build" },
  "Testing & Others": { icon: "science" },
};

export default function Skills() {
  const { skills } = useApp();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 82%",
        },
        y: 36,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative scroll-mt-28 py-16 sm:py-22">
      <div className="pointer-events-none absolute -left-40 top-20 h-[360px] w-[360px] rounded-full bg-[var(--color-accent-secondary)]/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-[var(--color-accent)]/10 blur-[140px]" />

      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="My Skills"
          subtitle="Frontend, backend, databases, and the tools I use to ship production-ready applications."
        />

        <div className="skills-grid mt-12 grid gap-6 lg:grid-cols-2">
          {skills.map((group, idx) => {
            const meta = GROUP_META[group.group] || { icon: "verified" };
            return (
              <motion.div
                key={group.group}
                className={[
                  "skill-card group relative overflow-hidden rounded-[28px] border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-7 backdrop-blur-2xl",
                  idx === 0 ? "lg:col-span-2" : "",
                ].join(" ")}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -right-16 -top-24 h-60 w-60 rounded-full bg-[var(--color-accent)]/12 blur-3xl" />
                  <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[var(--color-accent-secondary)]/10 blur-3xl" />
                </div>

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="font-secondary text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                      {group.group}
                    </p>
                    <p className="mt-2 font-secondary text-sm text-[var(--color-text-secondary)]">
                      {group.items.length} skills
                    </p>
                  </div>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-bg-elevated)]">
                    <span className="material-symbols-outlined text-[24px] text-[var(--color-accent)]">
                      {meta.icon}
                    </span>
                  </div>
                </div>

                <div className={["relative mt-6 flex flex-wrap gap-2.5", idx === 0 ? "gap-3" : ""].join(" ")}>
                  {group.items.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 420, damping: 24 }}
                      className="skill-pill inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)]/45 px-4 py-2"
                    >
                      <span className="material-symbols-outlined text-[20px] text-[var(--color-accent)]">
                        {item.icon || "verified"}
                      </span>
                      <span className="font-secondary text-sm font-semibold text-[var(--color-text-primary)]">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
