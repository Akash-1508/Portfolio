import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import { useApp } from "../context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const { site } = useApp();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const initials = site.authorName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const paragraphs = site.aboutParagraphs || [];
  const stats = site.aboutStats || [];

  return (
    <section id="about" ref={containerRef} className="relative scroll-mt-28 py-16 sm:py-22">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-[var(--color-accent)]/10 blur-[100px]" />

      <Container>
        <div className="about-reveal">
          <SectionHeading
            eyebrow="About"
            title="About Me"
            subtitle="Full stack developer focused on scalable apps, clean UI, and real-world delivery."
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
            className="about-reveal lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:mx-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="about-portrait relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[var(--color-glass-border)] bg-[var(--color-glass)] shadow-[0_40px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/30 via-[var(--color-bg-primary)] to-[var(--color-accent-secondary)]/25" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-primary text-6xl font-bold tracking-tight text-white/90 drop-shadow-lg">
                    {initials}
                  </span>
                </div>
                <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                  <p className="font-secondary text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                    Building
                  </p>
                  <p className="mt-1 font-primary text-lg font-bold text-white">CRM & web products</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="about-reveal space-y-8 lg:col-span-7">
            <div className="about-card rounded-[28px] border border-[var(--color-glass-border)] bg-[var(--color-glass)] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-9">
              <div className="space-y-5 font-secondary text-lg leading-relaxed text-[var(--color-text-secondary)]">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {stats.map((x) => (
                  <div
                    key={x.k}
                    className="about-stat rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]/50 p-5 transition hover:border-[var(--color-accent)]/35"
                  >
                    <p className="font-secondary text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                      {x.k}
                    </p>
                    <p className="mt-2 font-primary text-base font-bold text-[var(--color-text-primary)]">{x.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <style>{`
        .about-card {
          position: relative;
          transform: translate3d(0, 0, 0);
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 28px;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(
            120deg,
            rgba(124, 156, 255, 0.22),
            rgba(167, 139, 250, 0.18),
            rgba(251, 191, 119, 0.14)
          );
          transition: opacity 220ms cubic-bezier(0.22, 1, 0.36, 1);
          filter: blur(10px);
        }

        .about-card:hover {
          transform: translate3d(0, -6px, 0);
          border-color: color-mix(in srgb, var(--color-accent) 35%, var(--color-glass-border));
          box-shadow: 0 34px 110px rgba(0, 0, 0, 0.32);
        }

        .about-card:hover::before {
          opacity: 1;
        }

        .about-stat {
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
            background-color 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-stat:hover {
          transform: translate3d(0, -3px, 0);
          background-color: color-mix(in srgb, var(--color-bg-primary) 80%, transparent);
        }

        .about-portrait {
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-portrait:hover {
          border-color: color-mix(in srgb, var(--color-accent-secondary) 35%, var(--color-glass-border));
          transform: translate3d(0, -6px, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .about-card,
          .about-portrait,
          .about-stat {
            transition: none !important;
            transform: none !important;
          }
          .about-card::before {
            opacity: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
