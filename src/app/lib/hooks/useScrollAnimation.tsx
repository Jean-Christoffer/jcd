import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

interface UseScrollAnimationsOptions {
  pathRef: React.RefObject<SVGPathElement | null>;
  containerRef: React.RefObject<HTMLElement | null>;
  pathLength: number;
  lenis: Lenis | null;
}

export function useScrollAnimations({
  pathRef,
  containerRef,
  pathLength,
  lenis,
}: UseScrollAnimationsOptions): void {
  useGSAP(
    () => {
      const tlConfig = {
        pin: false,
        scrub: 1,
        invalidateOnRefresh: true,
        preventOverlaps: false,
        fastScrollEnd: false,
      };

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);

      const handleLenisScroll = () => ScrollTrigger.update();

      if (lenis) {
        lenis.on("scroll", handleLenisScroll);
      }

      if (pathLength > 0 && pathRef.current) {
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

      const heroTimeline = gsap.timeline();
      heroTimeline.to(".hero", {
        scrollTrigger: {
          ...tlConfig,
          scroller: containerRef.current,
          start: "top bottom",
          end: "10% 60%",
          trigger: ".work",
        },
        opacity: 0,
        ease: "sine.inOut",
      });

      const borderTimeline = gsap.timeline();
      borderTimeline
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

      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("resize", handleResize);
        if (lenis) {
          lenis.off("scroll", handleLenisScroll);
        }
      };
    },
    {
      dependencies: [pathLength, lenis],
      scope: containerRef,
    },
  );
}
