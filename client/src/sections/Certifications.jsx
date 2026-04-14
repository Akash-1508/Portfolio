import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import { useApp } from "../context/AppContext";

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const { certifications } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert-row", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
        },
        x: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={ref} className="relative scroll-mt-28 py-16 sm:py-22">
      <Container>
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications & Training"
          subtitle="Formal training and diplomas that strengthened my full stack and engineering fundamentals."
        />

        <div className="mx-auto mt-12 max-w-2xl space-y-3">
          {certifications.map((line) => (
            <motion.div
              key={line}
              whileHover={{ x: 4 }}
              className="cert-row flex items-center gap-4 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-5 py-4 backdrop-blur-xl"
            >
              <span className="material-symbols-outlined shrink-0 text-[var(--color-accent)]">verified</span>
              <p className="font-secondary text-base font-medium text-[var(--color-text-primary)]">{line}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
