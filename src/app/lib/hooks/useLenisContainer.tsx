"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
export function useLenisContainer(
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    lenisRef.current = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current,
      lerp: 0.1,
      duration: 1.5,
    });

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
