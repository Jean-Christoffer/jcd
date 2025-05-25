import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface UseIntroAnimationsOptions {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function useIntroAnimations({
  containerRef,
}: UseIntroAnimationsOptions): void {
  useGSAP(
    () => {
      const timeline = gsap.timeline();

      timeline

        .fromTo(
          ".animate3",
          {
            scaleX: 0,
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 1,
            transformOrigin: "left center",
          },
        )

        .fromTo(
          ".animate1, .animate2",
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.3,
            ease: "sine.inOut",
          },
        )

        .fromTo(
          ".animate3 span",
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: 0.5,
            ease: "sine.inOut",
            transformOrigin: "left center",
          },
        )
        .fromTo(
          ".animate4, .animate5, .animate6",
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: "sine.inOut",
          },
          "<",
        );
    },
    { scope: containerRef },
  );
}
