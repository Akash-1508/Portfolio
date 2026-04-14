import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/Container";
import { defaultPortfolioConfig } from "../config/defaultConfig.js";
import { CONFIG_UPDATE_EVENT, OVERRIDE_KEY } from "../context/AppContext.jsx";

export default function Admin() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const existing = window.localStorage.getItem(OVERRIDE_KEY);
      if (existing) {
        setText(existing);
      } else {
        setText(JSON.stringify(defaultPortfolioConfig, null, 2));
      }
    } catch {
      setText(JSON.stringify(defaultPortfolioConfig, null, 2));
    }
  }, []);

  const save = () => {
    try {
      JSON.parse(text);
      window.localStorage.setItem(OVERRIDE_KEY, text);
      window.dispatchEvent(new Event(CONFIG_UPDATE_EVENT));
      setMessage("Saved — config merged and applied.");
    } catch (e) {
      setMessage(`Invalid JSON: ${e.message}`);
    }
  };

  const clearOverride = () => {
    window.localStorage.removeItem(OVERRIDE_KEY);
    window.dispatchEvent(new Event(CONFIG_UPDATE_EVENT));
    setText(JSON.stringify(defaultPortfolioConfig, null, 2));
    setMessage("Local override cleared; remote / default config will load.");
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] px-4 py-16 text-[var(--color-text-primary)]">
      <Container className="max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-secondary text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">
            Optional
          </p>
          <h1 className="mt-2 font-primary text-3xl font-bold">Config override</h1>
          <p className="mt-3 font-secondary text-[var(--color-text-secondary)]">
            Paste JSON matching the remote config shape. It is stored in <code className="rounded bg-[var(--color-glass)] px-1">localStorage</code>{" "}
            and merged over <code className="rounded bg-[var(--color-glass)] px-1">/api/config</code>. Production: host{" "}
            <code className="rounded bg-[var(--color-glass)] px-1">public/api/config.json</code> or set{" "}
            <code className="rounded bg-[var(--color-glass)] px-1">VITE_CONFIG_URL</code>.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={save}
              className="rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] px-6 py-3 font-secondary text-sm font-semibold text-white shadow-lg"
            >
              Save & apply
            </button>
            <button
              type="button"
              onClick={clearOverride}
              className="rounded-full border border-[var(--color-glass-border)] px-6 py-3 font-secondary text-sm font-semibold text-[var(--color-text-primary)]"
            >
              Clear override
            </button>
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-[var(--color-glass-border)] px-6 py-3 font-secondary text-sm font-semibold"
            >
              ← Back
            </Link>
          </div>

          {message ? (
            <p className="mt-4 font-secondary text-sm text-[var(--color-text-secondary)]">{message}</p>
          ) : null}

          <textarea
            className="mt-8 h-[min(60vh,520px)] w-full resize-y rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 font-mono text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]/50"
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />
        </motion.div>
      </Container>
    </div>
  );
}
