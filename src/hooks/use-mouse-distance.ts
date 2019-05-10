import * as React from "react";
import { magnitude, Vector2, isVector2 } from "@/math";

export function useMouseDistance(
  ref: React.RefObject<Element | null> | Vector2,
  onMouseDistanceChanged: (distance: number) => void
) {
  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      let origin: Vector2;
      if (isVector2(ref)) {
        origin = ref;
      } else {
        if (!ref.current) {
          return;
        }
        const rect = ref.current.getBoundingClientRect();
        origin = { x: rect.left, y: rect.top };
      }

      const vec = { x: e.clientX - origin.x, y: e.clientY - origin.y };
      const length = magnitude(vec);
      onMouseDistanceChanged(length);
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [ref, onMouseDistanceChanged]);
}
