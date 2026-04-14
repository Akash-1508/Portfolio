import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "../context/SmoothScrollContext";
import { useApp } from "../context/AppContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const { site, navLinks } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(href, { offset: -88 });
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[80] px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary"
        className={[
          "glass-panel mx-auto flex max-w-6xl items-center gap-2 rounded-full px-3 py-2 sm:gap-4 sm:px-5 sm:py-3",
          scrolled ? "shadow-[0_20px_60px_rgba(0,0,0,0.35)]" : "",
        ].join(" ")}
      >
        {/* Brand — fixed width so links never sit underneath */}
        <Link
          to="/"
          className="shrink-0 basis-auto font-primary text-base font-bold tracking-tight text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)] sm:text-lg md:min-w-[4.5rem]"
        >
          {site.logoImage ? (
            <img src={site.logoImage} alt="" className="h-8 w-auto" loading="lazy" decoding="async" />
          ) : (
            site.logoText
          )}
        </Link>

        {/* Mobile spacer (keeps actions pinned right) */}
        <div className="min-w-0 flex-1 md:hidden" />

        {/* Desktop links — own flex region, centered, no overlap */}
        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <ul className="flex max-w-full flex-wrap items-center justify-center gap-x-0.5 gap-y-1 lg:gap-x-1">
            {navLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="block rounded-full px-2 py-2 font-secondary text-xs font-semibold text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/60 lg:px-2.5 lg:text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="hidden rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] px-4 py-2 font-secondary text-xs font-semibold text-[var(--btn-primary-text)] shadow-[var(--btn-primary-shadow)] transition hover:brightness-110 sm:inline-flex lg:px-5 lg:text-sm"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-glass-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="material-symbols-outlined text-[22px]">{open ? "close" : "menu"}</span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass-panel mx-auto mt-3 flex max-w-6xl flex-col gap-1 rounded-3xl p-4 md:hidden"
          >
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="mb-1 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] px-4 py-3 font-secondary text-sm font-semibold text-[var(--btn-primary-text)] shadow-[var(--btn-primary-shadow)] transition hover:brightness-110"
            >
              Let&apos;s talk
            </a>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="rounded-2xl px-4 py-3 font-secondary text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-glass)]"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
