import { useEffect, useState } from "react";

interface UsePathDataOptions {
  offset?: number;
}

export function usePathData(
  containerRef: React.RefObject<HTMLElement | null>,
  options: UsePathDataOptions = {},
) {
  const [pathData, setPathData] = useState<string>("");
  const { offset = 32 } = options;

  useEffect(() => {
    if (!containerRef.current) return;

    function calcPath(rect: DOMRect): string {
      return `M ${offset} ${offset}
              L ${rect.width - offset} ${offset}
              L ${rect.width - offset} ${rect.height - offset}
              L ${offset} ${rect.height - offset}
              L ${offset} ${offset}`;
    }

    function updatePath(): void {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPathData(calcPath(rect));
    }

    updatePath();

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) updatePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, offset]);

  return pathData;
}
