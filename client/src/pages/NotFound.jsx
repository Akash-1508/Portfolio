import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/Container";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-secondary text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent)]">404</p>
          <h1 className="mt-4 font-primary text-4xl font-bold sm:text-5xl">Page not found</h1>
          <p className="mx-auto mt-4 max-w-md font-secondary text-[var(--color-text-secondary)]">
            The route you requested doesn&apos;t exist. Head back to the portfolio home.
          </p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] px-8 py-3 font-secondary text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition hover:brightness-110"
          >
            Back home
          </Link>
        </motion.div>
      </Container>
    </div>
  );
};

export default NotFound;
