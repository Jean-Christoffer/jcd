"use client";

import gsap from "gsap";

import { useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Canvas from "./Canvas";
import Hero from "./Hero";
import Work from "./work/ProfessionalWork";
import Projects from "./work/Projects";

import { WORK_QUERYResult, PROJECT_QUERYResult } from "@/sanity/types";
import { useLenisContainer } from "../lib/hooks/useLenisContainer";
import { usePathData } from "../lib/hooks/useUpdatePath";
import { usePathLength } from "../lib/hooks/usePathLength";
import { useScrollAnimations } from "../lib/hooks/useScrollAnimation";

interface BodyProps {
  experience: WORK_QUERYResult;
  projects: PROJECT_QUERYResult;
}

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Content({ experience, projects }: BodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const lenis = useLenisContainer(containerRef);
  const pathData = usePathData(containerRef, { offset: 32 });
  const pathLength = usePathLength(pathRef, pathData);

  useScrollAnimations({
    pathRef,
    containerRef,
    pathLength,
    lenis,
  });
  return (
    <div
      ref={containerRef}
      className="overflow-x-hidden h-dvh overflow-y-scroll relative main-wrapper"
    >
      <div className="pointer-events-none fixed inset-0 z-20">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <path
            stroke="#d9d9d9"
            className="border-path stroke-muted-foreground fill-none border1 opacity-0"
            d={pathData}
            strokeWidth="2"
          />

          <path
            ref={pathRef}
            className="progress-path customGreenSvg stroke-muted-foreground fill-none border2 opacity-0"
            d={pathData}
            strokeWidth="2"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength}
          />
        </svg>
      </div>
      <section className="hero-section sticky top-0 h-dvh ">
        <div className="hero relative h-full z-10 p-12 md:p-14">
          <Hero />
        </div>
        <Canvas />
      </section>
      <section className="work relative z-10 h-dvh p-12 md:p-14">
        <Work data={experience} />
      </section>
      <section className="projects relative z-10 h-dvh p-12 md:p-14">
        <Projects data={projects} />
      </section>
    </div>
  );
}
