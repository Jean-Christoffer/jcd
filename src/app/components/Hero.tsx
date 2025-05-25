"use client";

import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useIntroAnimations } from "../lib/hooks/useIntroAnimation";

import Link from "next/link";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useIntroAnimations({ containerRef });

  return (
    <div className="max-w-[590px] z-10 relative" ref={containerRef}>
      <h1 className="flex flex-col text-4xl md:text-6xl font-bold">
        <span className="animate1 opacity-0">Jean</span>
        <span className="animate2 opacity-0"> Christoffer</span>
        <span className="animate3 relative h-1 w-full bg-[#d9d9d9] my-2 overflow-hidden opacity-0">
          <span className="absolute top-0 left-0 h-full w-full customGreen scale-x-0 origin-left"></span>
        </span>
        <span className="animate4 opacity-0">Web Developer</span>
      </h1>
      <article className="relative z-10 max-w-2xl mt-4 animate5 opacity-0">
        <p className="text-base">
          Experienced developer specializing in React, Next.js, and TypeScript.
          I have a strong passion for frontend development, creating engaging
          user interfaces with a focus on design and accessibility. Although my
          primary expertise is in frontend, my professional experience spans
          full-stack web development.
        </p>
      </article>
      <p className="mt-2 flex items-center gap-2 animate6 opacity-0">
        <em>Contact me on</em>
        <Link
          href="https://www.linkedin.com/in/jean-christoffer-d-7b7552260/"
          target="_blank"
          className="underline font-bold "
        >
          Linkedin
        </Link>
      </p>
    </div>
  );
}
