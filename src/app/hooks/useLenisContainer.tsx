"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Custom hook for container-specific Lenis
export function useLenisContainer(
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Lenis with custom container
    lenisRef.current = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current,
      lerp: 0.1,
      duration: 1.5,
    });

    // Animation loop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, [containerRef]);

  return lenisRef.current;
}
