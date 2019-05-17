import * as React from "react";
import { magnitude, Vector2 } from "@/math";

import useGameCoords from "./use-game-coords";

export function useMouseDistance(
  origin: Vector2,
  onMouseDistanceChanged: (distance: number) => void
) {
  const getGameCoords = useGameCoords();
  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const pt = getGameCoords({ x: e.clientX, y: e.clientY });
      const vec = { x: pt.x - origin.x, y: pt.y - origin.y };
      const length = magnitude(vec);
      onMouseDistanceChanged(length);
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [origin, onMouseDistanceChanged, getGameCoords]);
}
