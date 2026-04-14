"use client";

import React, { useState } from "react";
import { Calendar, Clock, Code, FileText, User } from "lucide-react";
import Container from "@/components/Container";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { GlassFilter } from "@/components/ui/liquid-radio";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const timelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Design",
    date: "Feb 2024",
    content: "UI/UX design and system architecture.",
    category: "Design",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: User,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

export default function UiDemos() {
  const [environment, setEnvironment] = useState("online");

  return (
    <main className="min-h-screen bg-black text-white">
      <Container className="py-10">
        <h1 className="font-primary text-3xl font-semibold tracking-tight">UI Demos</h1>
        <p className="mt-2 font-secondary text-sm text-white/70">
          Integrated shadcn/ui components + custom UI components.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="font-secondary text-sm font-semibold">Liquid radio</p>
          <div className="mt-4 inline-flex h-9 rounded-lg bg-white/5 p-0.5">
            <RadioGroup
              value={environment}
              onValueChange={setEnvironment}
              className="group relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-white/10 after:shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-ring/70 data-[state=offline]:after:translate-x-0 data-[state=online]:after:translate-x-full"
              data-state={environment}
            >
              <div
                className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-md"
                style={{ filter: 'url(\"#radio-glass\")' }}
              />
              <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors text-white/70 group-data-[state=online]:text-white/70 group-data-[state=offline]:text-white">
                Test
                <RadioGroupItem id="env-offline" value="offline" className="sr-only" />
              </label>
              <label className="relative z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors text-white/70 group-data-[state=offline]:text-white/70 group-data-[state=online]:text-white">
                Prod
                <RadioGroupItem id="env-online" value="online" className="sr-only" />
              </label>
              <GlassFilter />
            </RadioGroup>
          </div>
        </div>
      </Container>

      <RadialOrbitalTimeline timelineData={timelineData} />
    </main>
  );
}

