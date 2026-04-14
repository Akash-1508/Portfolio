import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { useApp } from "../context/AppContext";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { projects } = useApp();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".project-card-container",
          start: "top 82%",
        },
        y: 44,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative scroll-mt-28 py-16 sm:py-22">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-[var(--color-accent)]/10 blur-[130px]" />

      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Featured projects"
          subtitle="From CRM dashboards to full-stack apps—modular UI, APIs, and performance-focused delivery."
        />

        <div className="project-card-container mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
