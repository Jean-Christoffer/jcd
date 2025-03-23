"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import About from "./About";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".animate3",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, transformOrigin: "left center" }
      )
        .fromTo(
          ".animate1, .animate2",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.3, ease: "sine.inOut" }
        )
        .fromTo(
          ".animate3 span",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.5,
            ease: "sine.inOut",
            transformOrigin: "left center",
          }
        )
        .fromTo(
          ".animate4, .animate5",
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, ease: "sine.inOut" },
          "<"
        );
    },
    { scope: containerRef }
  );

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
      <About />
    </div>
  );
}
