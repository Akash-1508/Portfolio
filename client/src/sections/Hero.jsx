import React, { useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { useSmoothScroll } from "../context/SmoothScrollContext";
import { useApp } from "../context/AppContext";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollTo } = useSmoothScroll();
  const { site } = useApp();
  const phrases = useMemo(() => site.heroTypingPhrases, [site.heroTypingPhrases]);
  const typed = useTypingEffect(phrases);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -70]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-head-reveal", { yPercent: 100, duration: 0.95 })
        .from(
          ".hero-line",
          { y: 36, opacity: 0, stagger: 0.1, duration: 0.8 },
          "-=0.35"
        )
        .from(".hero-cta", { y: 24, opacity: 0, duration: 0.75 }, "-=0.45")
        .from(".hero-visual", { y: 56, opacity: 0, rotateX: 8, duration: 1 }, "-=0.55");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const go = (hash) => (e) => {
    e.preventDefault();
    scrollTo(hash, { offset: -88 });
  };

  const firstName = site.authorName?.split(" ")[0] || "Akash";
  const heroShots = useMemo(
    () => [
      { src: "/hero/hero-1.png", alt: "Portfolio hero preview" },
      { src: "/hero/hero-2.png", alt: "About section preview" },
      { src: "/hero/hero-3.png", alt: "Skills section preview" },
      { src: "/hero/hero-4.png", alt: "Projects section preview" },
    ],
    []
  );

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-[100dvh] overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-90" style={{ background: "var(--gradient-hero)" }} />
        <motion.div
          style={{ y: orb1Y }}
          aria-hidden
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[var(--color-accent)]/25 blur-[120px]"
        />
        <motion.div
          style={{ y: orb2Y }}
          aria-hidden
          className="absolute -right-24 bottom-10 h-[380px] w-[380px] rounded-full bg-[var(--color-accent-secondary)]/20 blur-[110px]"
        />
        <div className="hero-mesh absolute inset-0 opacity-[0.35]" />
      </div>

      <Container className="relative z-10 pb-20 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h1 className="font-primary text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.12] tracking-tight text-[var(--color-text-primary)]">
              <span className="block overflow-hidden pb-1">
                <span className="hero-head-reveal block">
                  Hi, I&apos;m {site.authorName} <span className="inline-block">👋</span>
                </span>
              </span>
            </h1>

            <p className="hero-line mt-5 max-w-2xl font-secondary text-base font-semibold leading-snug text-[var(--color-accent)] sm:text-lg">
              {site.heroSubheading}
            </p>

            <p className="hero-line mt-4 max-w-2xl font-secondary text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
              I focus on{" "}
              <span className="font-semibold text-[var(--color-text-primary)]">
                <span className="gradient-text">{typed}</span>
                <span className="ml-0.5 inline-block h-[0.9em] w-px animate-pulse bg-[var(--color-accent)] align-[-0.1em]" />
              </span>
            </p>

            <p className="hero-line mt-5 max-w-xl font-secondary text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              {site.authorDescription}
            </p>

            <div className="hero-cta mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <PrimaryButton as="button" type="button" onClick={go("#projects")}>
                View Projects
              </PrimaryButton>
              <SecondaryButton as="button" type="button" onClick={go("#contact")}>
                Contact Me
              </SecondaryButton>
            </div>

            <div className="hero-cta mt-10 flex flex-wrap gap-2">
              {["React.js", "Node.js", "MongoDB", "REST APIs", "Full Stack"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-4 py-1.5 font-secondary text-xs font-semibold text-[var(--color-text-secondary)] backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual lg:col-span-5" style={{ perspective: "1000px" }}>
            <motion.div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel relative overflow-hidden rounded-[28px] p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 via-transparent to-[var(--color-accent-secondary)]/10" />
                <div className="relative space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="font-primary text-lg font-bold text-[var(--color-text-primary)]">
                      Hey, I&apos;m {firstName}
                    </p>
                    <span className="material-symbols-outlined text-[var(--color-accent)]">waving_hand</span>
                  </div>
                  {[
                    {
                      t: "CRM & dashboards",
                      d: "Modular React UI, REST integrations, and performance-minded architecture.",
                    },
                    {
                      t: "Full stack delivery",
                      d: "React, Node, MongoDB — from interface polish to API-driven features.",
                    },
                    {
                      t: "User-first mindset",
                      d: "Responsive layouts, clear UX, and code that stays maintainable.",
                    },
                  ].map((row) => (
                    <motion.div
                      key={row.t}
                      whileHover={{ x: 4 }}
                      className="rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-bg-primary)]/40 p-4 transition hover:border-[var(--color-accent)]/35"
                    >
                      <p className="font-primary text-sm font-bold text-[var(--color-text-primary)]">{row.t}</p>
                      <p className="mt-1 font-secondary text-sm text-[var(--color-text-secondary)]">{row.d}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="pointer-events-none absolute -inset-6 -z-10 hidden sm:block">
                <motion.div
                  style={{ y: useTransform(scrollYProgress, [0, 1], [18, -26]) }}
                  className="hero-shot absolute right-4 top-6 w-[78%] rotate-2"
                >
                  <div className="hero-shot-frame">
                    <img
                      src={heroShots[0].src}
                      alt={heroShots[0].alt}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="hero-shot-img"
                    />
                    <div className="hero-shot-fallback" />
                  </div>
                </motion.div>
                <motion.div
                  style={{ y: useTransform(scrollYProgress, [0, 1], [-8, 22]) }}
                  className="hero-shot absolute left-2 top-32 w-[64%] -rotate-3"
                >
                  <div className="hero-shot-frame">
                    <img
                      src={heroShots[2].src}
                      alt={heroShots[2].alt}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="hero-shot-img"
                    />
                    <div className="hero-shot-fallback" />
                  </div>
                </motion.div>
                <motion.div
                  style={{ y: useTransform(scrollYProgress, [0, 1], [10, -18]) }}
                  className="hero-shot absolute right-8 bottom-6 w-[70%] rotate-1"
                >
                  <div className="hero-shot-frame">
                    <img
                      src={heroShots[3].src}
                      alt={heroShots[3].alt}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="hero-shot-img"
                    />
                    <div className="hero-shot-fallback" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      <style>{`
        .hero-mesh {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(124, 156, 255, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(251, 191, 119, 0.08) 0%, transparent 50%);
        }

        .hero-shot {
          filter: drop-shadow(0 40px 70px rgba(0, 0, 0, 0.55));
        }

        .hero-shot-frame {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(10, 12, 18, 0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          position: relative;
        }

        .hero-shot-frame::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(80% 60% at 50% 0%, rgba(124, 156, 255, 0.14), transparent 60%),
            linear-gradient(135deg, rgba(167, 139, 250, 0.14), transparent 55%);
          opacity: 0.85;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .hero-shot-img {
          display: block;
          width: 100%;
          height: auto;
          transform: translate3d(calc(var(--lenis-velocity-signed, 0) * 0.02px), 0, 0);
          transition: transform 180ms ease-out;
          opacity: 0.92;
        }

        .hero-shot-fallback {
          height: 180px;
          background: linear-gradient(
              120deg,
              rgba(124, 156, 255, 0.16),
              rgba(167, 139, 250, 0.12),
              rgba(251, 191, 119, 0.08)
            ),
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.06), transparent 45%);
        }
      `}</style>
    </section>
  );
}
