"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface HeaderProps {
  handleClick: () => void;
}
export default function Header({ handleClick }: HeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".animate3",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, transformOrigin: "left center" }
      );

      tl.fromTo(
        ".animate1, .animate2",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3, ease: "sine.inOut" }
      );
      tl.fromTo(
        ".animate3 span",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          ease: "sine.inOut",
          transformOrigin: "left center",
        }
      );

      tl.fromTo(
        ".animate4",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: "sine.inOut" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div className="max-w-[590px] z-10 relative">
      <h1
        className="flex flex-col text-4xl md:text-6xl font-bold"
        ref={containerRef}
      >
        <span className="animate1">Jean</span>
        <span className="animate2"> Christoffer</span>
        <span className="animate3 relative h-1 w-full bg-[#d9d9d9] my-2 overflow-hidden">
          <span className="absolute top-0 left-0 h-full w-full customGreen scale-x-0 origin-left"></span>
        </span>
        <span className="animate4">Web Developer</span>
      </h1>
      <ul className="flex items-center gap-4 mt-4">
        <Buttons handleClick={handleClick} />
      </ul>
    </div>
  );
}

const Buttons = ({ handleClick }: HeaderProps) => {
  const list = ["Link", "About", "Contact"];

  return list.map((l, i) => (
    <button key={i} className="cursor-pointer" onClick={handleClick}>
      {l}
    </button>
  ));
};
