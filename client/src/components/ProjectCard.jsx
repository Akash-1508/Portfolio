import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import SecondaryButton from "./SecondaryButton";

function getProjectIcon(project) {
  if (project?.icon) return project.icon;
  const t = `${project?.title ?? ""} ${project?.description ?? ""}`.toLowerCase();
  if (t.includes("crm")) return "dashboard";
  if (t.includes("dashboard")) return "space_dashboard";
  if (t.includes("robot") || t.includes("bot")) return "smart_toy";
  if (t.includes("dairy") || t.includes("farm")) return "agriculture";
  if (t.includes("ecommerce") || t.includes("shop")) return "shopping_bag";
  if (t.includes("portfolio")) return "person";
  return "layers";
}

export default function ProjectCard({ project }) {
  const icon = getProjectIcon(project);
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1200}
      scale={1.02}
      transitionSpeed={1600}
      gyroscope={false}
      className="project-card h-full"
    >
      <motion.article
        layout
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
      >
        {project.image ? (
          <div className="relative shrink-0 overflow-hidden">
            <img
              src={project.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-48 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/90 via-transparent to-transparent" />
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute -right-16 -top-24 h-56 w-56 rounded-full bg-[var(--color-accent)]/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[var(--color-accent-secondary)]/15 blur-3xl" />
        </div>

        <div className="relative flex flex-1 flex-col p-8">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-bg-elevated)]">
            <span className="material-symbols-outlined text-[24px] text-[var(--color-accent)]">{icon}</span>
          </div>

          <h3 className="font-primary text-xl font-bold text-[var(--color-text-primary)]">{project.title}</h3>
          <p className="mt-3 flex-1 font-secondary text-base leading-relaxed text-[var(--color-text-secondary)]">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {(project.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)]/60 px-3 py-1 font-secondary text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.highlights?.length ? (
            <div className="mt-6">
              <p className="font-secondary text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Highlights
              </p>
              <ul className="mt-3 space-y-2 font-secondary text-sm text-[var(--color-text-secondary)]">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-warm)]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {project.links?.live ? (
              <SecondaryButton href={project.links.live} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                Live demo
              </SecondaryButton>
            ) : null}
            {project.links?.code ? (
              <SecondaryButton href={project.links.code} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                GitHub
              </SecondaryButton>
            ) : null}
          </div>
        </div>
      </motion.article>
    </Tilt>
  );
}
