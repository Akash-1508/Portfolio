import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { useApp } from "../context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const initial = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const { site } = useApp();
  const containerRef = useRef(null);
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-animate", {
        scrollTrigger: {
          trigger: ".contact-animate",
          start: "top 80%",
        },
        y: 36,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (status !== "idle" && status !== "loading") {
      setStatus("idle");
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const apiUrl = site.contactApiUrl?.trim();

    if (!apiUrl) {
      setStatus("noop");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      });
      if (!res.ok) {
        let serverMsg = "";
        try {
          const data = await res.json();
          serverMsg = typeof data?.error === "string" ? data.error : "";
        } catch {
          // ignore JSON parse errors
        }
        throw new Error(serverMsg || `Request failed (${res.status})`);
      }
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong.");
    }
  };

  const phoneDigits = site.contactPhone?.replace(/\D/g, "");
  const telHref = phoneDigits ? `tel:+91${phoneDigits}` : `tel:${site.contactPhone}`;

  return (
    <section id="contact" ref={containerRef} className="relative scroll-mt-28 py-16 sm:py-22">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[var(--color-accent)]/10 to-transparent blur-3xl" />

      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          subtitle={"I'm always open to discussing new opportunities, projects, or collaborations. Feel free to reach out!"}
        />

        <div className="contact-animate mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-5">
          <div className="glass-panel rounded-[28px] p-7 sm:p-8 lg:col-span-2">
            <p className="font-secondary text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Details
            </p>
            <ul className="mt-6 space-y-5 font-secondary text-[var(--color-text-secondary)]">
              <li className="flex gap-3">
                <span className="material-symbols-outlined shrink-0 text-[var(--color-accent)]">mail</span>
                <a
                  className="font-semibold text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)]"
                  href={`mailto:${site.contactEmail}`}
                >
                  {site.contactEmail}
                </a>
              </li>
              {site.contactPhone ? (
                <li className="flex gap-3">
                  <span className="material-symbols-outlined shrink-0 text-[var(--color-accent)]">call</span>
                  <a
                    className="font-semibold text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)]"
                    href={telHref}
                  >
                    {site.contactPhone}
                  </a>
                </li>
              ) : null}
              {site.contactLocation ? (
                <li className="flex gap-3">
                  <span className="material-symbols-outlined shrink-0 text-[var(--color-accent)]">location_on</span>
                  <span className="font-medium text-[var(--color-text-primary)]">{site.contactLocation}</span>
                </li>
              ) : null}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <SecondaryButton href={`mailto:${site.contactEmail}`}>Email me</SecondaryButton>
              {site.contactPhone ? (
                <SecondaryButton href={telHref}>Call me</SecondaryButton>
              ) : null}
              <SecondaryButton href={site.socialLinks.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </SecondaryButton>
              {/* {site.socialLinks.linkedin ? (
                <SecondaryButton href={site.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </SecondaryButton>
              ) : null} */}
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="glass-panel rounded-[28px] p-7 sm:p-8 lg:col-span-3"
            initial={false}
          >
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="font-secondary text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Name
                </span>
                <motion.input
                  required
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  whileFocus={{ scale: 1.01 }}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/70 px-4 py-3 font-secondary text-[var(--color-text-primary)] outline-none ring-0 transition focus:border-[var(--color-accent)]/60"
                  autoComplete="name"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-secondary text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Email
                </span>
                <motion.input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  whileFocus={{ scale: 1.01 }}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/70 px-4 py-3 font-secondary text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent)]/60"
                  autoComplete="email"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-secondary text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Mobile number
                </span>
                <motion.input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  whileFocus={{ scale: 1.01 }}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/70 px-4 py-3 font-secondary text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent)]/60"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="e.g. 9876543210"
                />
              </label>
              <label className="grid gap-2">
                <span className="font-secondary text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  Message
                </span>
                <motion.textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  whileFocus={{ scale: 1.005 }}
                  className="resize-y rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/70 px-4 py-3 font-secondary text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent)]/60"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <PrimaryButton as="button" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Send message"}
              </PrimaryButton>
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.p
                    key="ok"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-secondary text-sm font-semibold text-emerald-400"
                  >
                    Thanks — your message is on its way.
                  </motion.p>
                ) : null}
                {status === "noop" ? (
                  <motion.p
                    key="noop"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="max-w-xs font-secondary text-sm text-[var(--color-text-secondary)]"
                  >
                    Set <code className="rounded bg-[var(--color-glass)] px-1.5 py-0.5">VITE_CONTACT_API_URL</code>{" "}
                    to enable POST submission.
                  </motion.p>
                ) : null}
                {status === "error" ? (
                  <motion.p
                    key="err"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-secondary text-sm font-semibold text-red-400"
                  >
                    {error}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
