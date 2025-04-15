"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

import Canvas from "./Canvas";
import Hero from "./Hero";
import Work from "./Work";
import Projects from "./Projects";

import { WORK_QUERYResult, PROJECT_QUERYResult } from "@/sanity/types";

interface BodyProps {
  experience: WORK_QUERYResult;
  projects: PROJECT_QUERYResult;
}

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Body({ experience, projects }: BodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathData, setPathData] = useState<string>("");
  const [pathLength, setPathLength] = useState<number>(0);

  function calcPath(rect: DOMRect) {
    const offset = 32;

    return `M ${offset} ${offset}
            L ${rect.width - offset} ${offset}
            L ${rect.width - offset} ${rect.height - offset}
            L ${offset} ${rect.height - offset}
            L ${offset} ${offset}`;
  }

  useEffect(() => {
    if (!containerRef.current) return;

    function updatePath() {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPathData(calcPath(rect));
    }

    updatePath();

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) updatePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [containerRef]);

  useEffect(() => {
    if (pathRef.current) {
      requestAnimationFrame(() => {
        const length = pathRef.current?.getTotalLength();
        setPathLength(length ?? 0);
      });
    }
  }, [pathData]);

  useGSAP(
    () => {
      const tlConfig = {
        scroller: containerRef.current,
        pin: false,
        scrub: 1,
        invalidateOnRefresh: true,
        preventOverlaps: false,
        fastScrollEnd: false,
      };
      window.addEventListener("resize", () => ScrollTrigger.refresh());

      if (pathLength > 0) {
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            ...tlConfig,
            scroller: containerRef.current,
            refreshPriority: 1,
            trigger: ".hero",
            endTrigger: ".projects",
            start: "center 10%",
            end: "20% 25%",
          },
        });
      }
      ScrollTrigger.refresh();

      const tl = gsap.timeline();
      const tl2 = gsap.timeline();

      tl.to(".hero", {
        scrollTrigger: {
          ...tlConfig,
          start: "top bottom",
          end: "10% 60%",
          trigger: ".work",
        },
        opacity: 0,
        ease: "sine.inOut",
      });
      tl2
        .to(".border1", {
          opacity: 1,
          duration: 1.5,
          ease: "sine.inOut",
        })
        .to(".border2", {
          opacity: 1,
          duration: 1.5,
          ease: "sine.inOut",
        });
    },
    { dependencies: [pathLength], scope: containerRef }
  );
  return (
    <div
      ref={containerRef}
      className="overflow-x-hidden overflow-y-auto h-dvh relative p-4 md:p-8 main-wrapper"
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
      <section className="hero-section sticky top-0 ">
        <figure>
          <div className="hero relative z-10">
            <Hero />
          </div>
          <Canvas />
        </figure>
      </section>

      <section className="work relative z-10">
        <Work data={experience} />
      </section>
      <section className="projects relative z-10">
        <Projects data={projects} />
      </section>
    </div>
  );
}
