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

  const sketch = useCallback(
    (p: p5) => {
      let pulseActive = false;
      let pulseRadius = 0;

      const noiseScale = 0.01 / 2;
      const perlin = p.noise.bind(p);

      const pulseMaxRadius = 150;
      const pulseSpeed = 10;
      const pulseForce = 7;

      const colors = [
        { h: 74, s: 98, l: 41 }, // #87CF02
        { h: 89, s: 61, l: 55 }, // #9FCF47
        { h: 116, s: 98, l: 41 }, // #31CF02
        { h: 132, s: 98, l: 41 }, // #02CF21
        { h: 58, s: 98, l: 41 }, // #CFCA02
        { h: 48, s: 98, l: 41 }, // #CFB202
      ];

      let currentColor = colors[0];
      let nextColor = colors[1];
      let index = 0;

      const colorRotation = () => {
        index += 1;
        if (index === colors.length - 1) index = 0;
        currentColor = colors[index];
        nextColor = colors[index + 1];
      };

      p.setup = () => {
        const width = containerRef.current?.offsetWidth ?? p.windowWidth;
        const height = containerRef.current?.offsetHeight ?? p.windowHeight; 

        p.mousePressed = () => {
          pulseRadius = 0;
          pulseActive = true;
        };

        p.createCanvas(width, height).parent(containerRef.current!);
        p.colorMode(p.HSL, 360, 100, 100, 255);

        const num = checkIsMobile(width) ? 1000 : 2200;
        setParticlesAmount(num);
        particlesRef.current = [];

        for (let i = 0; i < num; i++) {
          particlesRef.current.push(p.createVector(p.random(width), p.random(height)));
        }

        p.clear();

        setInterval(colorRotation, 15000);
      };

      p.draw = () => {
        const width = p.width;
        const height = p.height;
        p.noFill();

        p.background("#101010");

        currentColor.h = p.lerp(currentColor.h, nextColor.h, 0.01);
        currentColor.s = p.lerp(currentColor.s, nextColor.s, 0.01);
        currentColor.l = p.lerp(currentColor.l, nextColor.l, 0.01);

        p.stroke(currentColor.h, currentColor.s, currentColor.l, 255);

        function lerpAngle(a: number, b: number, t: number) {
          const diff = ((b - a + p.PI) % p.TAU) - p.PI;
          return a + diff * t;
        }

        const avoidanceRadius = 150;

        if (pulseActive) {
          pulseRadius += pulseSpeed;
          if (pulseRadius > pulseMaxRadius) {
            pulseActive = false;
          }
        }

        for (let i = 0; i < particlesAmount; i++) {
          const particle = particlesRef.current[i];
          if (!particle) continue;

          p.point(particle.x, particle.y);

          const n = perlin(particle.x * noiseScale, particle.y * noiseScale);
          const noiseAngle = p.TAU * n;

          const dx = p.mouseX - particle.x;
          const dy = p.mouseY - particle.y;

          const radialAngle = p.atan2(dy, dx) + p.PI;

          const distToMouse = p.dist(
            p.mouseX,
            p.mouseY,
            particle.x,
            particle.y,
          );

          const avoidanceStrength = p.constrain(
            1 - distToMouse / avoidanceRadius,
            0,
            1,
          );

          const combinedAngle = lerpAngle(
            noiseAngle,
            radialAngle,
            avoidanceStrength,
          );

          if (!Number.isFinite(combinedAngle)) continue;

          let moveX = p.cos(combinedAngle);
          let moveY = p.sin(combinedAngle);

          const dxPulse = particle.x - p.mouseX;
          const dyPulse = particle.y - p.mouseY;
          const distToPulse = p.sqrt(dxPulse * dxPulse + dyPulse * dyPulse);

          const pulseThickness = 60;

          const edgeDist = Math.abs(distToPulse - pulseRadius);

          if (pulseActive && edgeDist < pulseThickness) {
            const strength = 1 - edgeDist / pulseThickness;
            const angle = p.atan2(dyPulse, dxPulse);
            moveX += p.cos(angle) * pulseForce * strength;
            moveY += p.sin(angle) * pulseForce * strength;
          }
          particle.x += moveX;
          particle.y += moveY;

          if (!isOnScreen(particle, width, height)) {
            particle.x = p.random(width);
            particle.y = p.random(height);
          }
        }
      };
    },
    [particlesAmount],
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

        setParticlesAmount(num);

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
