import * as React from "react";

import { Vector2 } from "@/math";
import { useMouseDistance } from "@/hooks/use-mouse-distance";

export interface MouseRevealProps {
  originRef?: React.RefObject<Element | null>;
  originVec?: Vector2;
  revealDistance?: number;
}

const MouseReveal: React.FC<MouseRevealProps> = ({
  originRef,
  originVec,
  revealDistance = 50,
  children
}) => {
  if (!originRef && !originVec) {
    console.warn("MouseReveal requires originRef or originVec");
    return <React.Fragment />;
  }

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
  useMouseDistance((originRef || originVec) as any, onMouseDistance);

  return <React.Fragment>{mouseInRange && children}</React.Fragment>;
};

export default MouseReveal;
