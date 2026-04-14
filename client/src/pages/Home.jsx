import React, { Suspense, lazy } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionSkeleton from "../components/SectionSkeleton";

const Hero = lazy(() => import("../sections/Hero"));
const About = lazy(() => import("../sections/About"));
const Skills = lazy(() => import("../sections/Skills"));
const Projects = lazy(() => import("../sections/Projects"));
const Experience = lazy(() => import("../sections/Experience"));
const Education = lazy(() => import("../sections/Education"));
const Certifications = lazy(() => import("../sections/Certifications"));
const Contact = lazy(() => import("../sections/Contact"));

const Home = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div
        className="lenis-ambient-sheen fixed inset-x-0 top-0 -z-[1] h-[min(88vh,920px)] opacity-[0.2]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, color-mix(in srgb, var(--color-accent) 28%, transparent), transparent 65%), radial-gradient(ellipse 70% 45% at 85% 25%, color-mix(in srgb, var(--color-accent-secondary) 18%, transparent), transparent 55%)",
        }}
      />
      <Navbar />
      <Suspense fallback={<SectionSkeleton label="Loading hero" />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Loading about" />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Loading skills" />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Loading projects" />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Loading experience" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Loading education" />}>
        <Education />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Loading certifications" />}>
        <Certifications />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Loading contact" />}>
        <Contact />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;
