"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type p5 from "p5";

const checkIsMobile = (width: number) => width < 768;

const isOnScreen = (
  { x, y }: p5.Vector,
  width: number,
  height: number,
): boolean => x >= 0 && x <= width && y >= 0 && y <= height;

export default function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5>(null);
  const particlesRef = useRef<p5.Vector[]>([]);
  const [particlesAmount, setParticlesAmount] = useState(0);
  const [alphaValue, setAlphaValue] = useState(0);

  const sketch = useCallback(
    (p: p5) => {
      const noiseScale = 0.01 / 2;
      const currentColor = { h: 50, s: 50, l: 25 };
      const targetColor = { h: 50, s: 50, l: 25 };

      const randomizeColor = () => {
        targetColor.h = p.random(0, 360);
        targetColor.s = p.random(50, 100);
        targetColor.l = p.random(40, 60);
      };

      p.setup = () => {
        const width = containerRef.current?.offsetWidth ?? p.windowWidth;
        const height = containerRef.current?.offsetHeight ?? p.windowHeight;

        p.createCanvas(width, height).parent(containerRef.current!);
        p.colorMode(p.HSL, 360, 100, 100, 255);

        const num = checkIsMobile(width) ? 1000 : 2200;
        const alpha = checkIsMobile(width) ? 145 : 205;
        setParticlesAmount(num);
        setAlphaValue(alpha);

        for (let i = 0; i < particlesAmount; i++) {
          particlesRef.current.push(
            p.createVector(p.random(width), p.random(height)),
          );
        }

        p.clear();
        randomizeColor();
        setInterval(randomizeColor, 15000);
      };

      p.draw = () => {
        const width = p.width;
        const height = p.height;

        p.background("#101010");
        currentColor.h = p.lerp(currentColor.h, targetColor.h, 0.01);
        currentColor.s = p.lerp(currentColor.s, targetColor.s, 0.01);
        currentColor.l = p.lerp(currentColor.l, targetColor.l, 0.01);

        p.stroke(currentColor.h, currentColor.s, currentColor.l, alphaValue);

        for (let i = 0; i < particlesAmount; i++) {
          const particle = particlesRef.current[i];
          if (!particle) continue;
          p.point(particle.x, particle.y);

          const n = p.noise(particle.x * noiseScale, particle.y * noiseScale);
          const a = p.TAU * n;
          particle.x += p.cos(a);
          particle.y += p.sin(a);

          if (!isOnScreen(particle, width, height)) {
            particle.x = p.random(width);
            particle.y = p.random(height);
          }
        }
      };
    },
    [alphaValue, particlesAmount],
  );

  useEffect(() => {
    import("p5").then((module) => {
      const p5 = module.default;
      const instance = new p5(sketch);
      p5InstanceRef.current = instance;
    });

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [sketch]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      if (containerRef.current && p5InstanceRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        const num = checkIsMobile(width) ? 500 : 2000;
        const alpha = checkIsMobile(width) ? 105 : 155;
        setParticlesAmount(num);
        setAlphaValue(alpha);
        p5InstanceRef.current.resizeCanvas(width, height);
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 canvas-wrapper " />
  );
}
