import React from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import { useApp } from "../context/AppContext";
import { useSmoothScroll } from "../context/SmoothScrollContext";

export default function Footer() {
  const { site } = useApp();
  const { scrollTo } = useSmoothScroll();

  const social = [
    { label: "GitHub", href: site.socialLinks.github, icon: "code" },
    { label: "LinkedIn", href: site.socialLinks.linkedin, icon: "work" },
    { label: "Twitter", href: site.socialLinks.twitter, icon: "chat_bubble" },
  ].filter((s) => s.href);

  const jump = (hash) => (e) => {
    e.preventDefault();
    scrollTo(hash, { offset: -88 });
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/80 py-12 backdrop-blur-xl">
      <Container className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p className="text-center font-secondary text-sm text-[var(--color-text-secondary)] sm:text-left">
            © {new Date().getFullYear()} {site.authorName}. Crafted with React & motion.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-secondary text-xs font-semibold text-[var(--color-text-secondary)] sm:justify-start">
            <a
              href="#education"
              onClick={jump("#education")}
              className="transition hover:text-[var(--color-accent)]"
            >
              Education
            </a>
            <span className="text-[var(--color-border)]" aria-hidden>
              ·
            </span>
            <a
              href="#certifications"
              onClick={jump("#certifications")}
              className="transition hover:text-[var(--color-accent)]"
            >
              Certifications
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {social.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-4 py-2 font-secondary text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-accent)]/40"
            >
              <span className="material-symbols-outlined text-[20px] text-[var(--color-accent)]">
                {item.icon}
              </span>
              {item.label}
            </motion.a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
