import { useEffect, useState } from "react";

export function usePathLength(
  pathRef: React.RefObject<SVGPathElement | null>,
  pathData: string,
): number {
  const [pathLength, setPathLength] = useState<number>(0);

  useEffect(() => {
    if (!pathRef.current || !pathData) return;

    requestAnimationFrame(() => {
      const length = pathRef.current?.getTotalLength();
      setPathLength(length ?? 0);
    });
  }, [pathRef, pathData]);

  return pathLength;
}
