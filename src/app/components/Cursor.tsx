"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);
  const followerRef = useRef<HTMLSpanElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const cursorXSetter = gsap.quickTo("#cursor", "x", {
      duration: 0.2,
      ease: "power3",
    });
    const cursorYSetter = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.2,
      ease: "power3",
    });

    const followerXSetter = gsap.quickTo(followerRef.current, "x", {
      duration: 0.6,
      ease: "power3",
    });
    const followerYSetter = gsap.quickTo("#follower", "y", {
      duration: 0.6,
      ease: "power3",
    });

    const pulseXSetter = gsap.quickTo(pulseRef.current, "x", {
      duration: 0.2,
      ease: "power3",
    });
    const pulseYSetter = gsap.quickTo(pulseRef.current, "y", {
      duration: 0.2,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      cursorXSetter(x);
      cursorYSetter(y);
      followerXSetter(x);
      followerYSetter(y);
      pulseXSetter(x);
      pulseYSetter(y);
    });

    window.addEventListener("click", () => {
      gsap.fromTo(
        pulseRef.current,
        { scale: 0, opacity: 0.5 },
        { scale: 2, opacity: 0, duration: 0.5, ease: "power3.out" },
      );
    });
  }, []);

  return (
    <>
      <span
        id="pulse"
        ref={pulseRef}
        className="invisible md:visible pointer-events-none fixed z-40 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#CFB202] opacity-0"
      />
      <span
        id="cursor"
        ref={cursorRef}
        className="invisible md:visible pointer-events-none fixed z-50 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CFB202]"
      />
      <span
        id="follower"
        ref={followerRef}
        className="invisible md:visible pointer-events-none fixed z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#31CF02] bg-transparent"
      />
    </>
  );
}
