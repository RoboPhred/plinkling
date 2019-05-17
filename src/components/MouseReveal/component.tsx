import * as React from "react";

import { Vector2 } from "@/math";
import { useMouseDistance } from "@/hooks/use-mouse-distance";

export interface MouseRevealProps {
  originVec: Vector2;
  revealDistance?: number;
}

const MouseReveal: React.FC<MouseRevealProps> = ({
  originVec,
  revealDistance = 50,
  children
}) => {
  const [mouseInRange, setMouseInRange] = React.useState(false);
  const onMouseDistance = React.useCallback(
    (length: number) => {
      if (!mouseInRange && length <= revealDistance) {
        setMouseInRange(true);
      } else if (mouseInRange && length > revealDistance) {
        setMouseInRange(false);
      }
    },
    [mouseInRange]
  );
  useMouseDistance(originVec, onMouseDistance);

  return <React.Fragment>{mouseInRange && children}</React.Fragment>;
};

export default MouseReveal;
