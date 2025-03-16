"use client";

import { useEffect, useRef } from "react";

import type p5 from "p5";
export default function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p5Instance: p5;

    import("p5").then((module) => {
      const p5 = module.default;

      const sketch = (p: p5) => {
        let num = 2000;

        let isMobileDevice: boolean = p.windowWidth < 768;

        if (isMobileDevice) num = 500;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const particles: any = [];

        const noiseScale = 0.01 / 2;
        const width = containerRef?.current?.offsetWidth ?? p.windowWidth;

        const height = containerRef?.current?.offsetHeight ?? p.windowHeight;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const onScreen = (value: any) => {
          return (
            value.x >= 0 &&
            value.x <= width &&
            value.y >= 0 &&
            value.y <= height
          );
        };

        const currentColor = { h: 50, s: 50, l: 25 };
        const targetColor = { h: 50, s: 50, l: 25 };

        const randomizeColor = () => {
          targetColor.h = p.random(0, 360);
          targetColor.s = p.random(50, 100);
          targetColor.l = p.random(40, 60);
        };

        p.setup = () => {
          p.createCanvas(width, height).parent(containerRef.current!);
          p.colorMode(p.HSL, 360, 100, 100, 255);
          for (let i = 0; i < num; i++) {
            particles.push(p.createVector(p.random(width), p.random(height)));
          }
          p.clear();
          randomizeColor();
          setInterval(randomizeColor, 15000);
        };

        window.addEventListener("resize", () => {
          const newWidth = containerRef?.current?.offsetWidth ?? p.windowWidth;
          const newHeight =
            containerRef?.current?.offsetHeight ?? p.windowHeight;

          isMobileDevice = p.windowWidth < 768;

          p.resizeCanvas(newWidth, newHeight);
        });

        p.draw = () => {
          p.background("#101010");
          currentColor.h = p.lerp(currentColor.h, targetColor.h, 0.01);
          currentColor.s = p.lerp(currentColor.s, targetColor.s, 0.01);
          currentColor.l = p.lerp(currentColor.l, targetColor.l, 0.01);

          p.stroke(
            currentColor.h,
            currentColor.s,
            currentColor.l,
            isMobileDevice ? 105 : 155
          );

          for (let i = 0; i < num; i++) {
            const particle = particles[i];
            p.point(particle.x, particle.y);
            const n = p.noise(particle.x * noiseScale, particle.y * noiseScale);
            const a = p.TAU * n;
            particle.x += p.cos(a);
            particle.y += p.sin(a);

            if (!onScreen(particle)) {
              particle.x = p.random(width);
              particle.y = p.random(height);
            }
          }
        };
      };

      p5Instance = new p5(sketch);
    });

    return () => {
      p5Instance?.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute overflow-hidden inset-0" />
  );
}
