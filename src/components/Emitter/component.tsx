import * as React from "react";
import { Vector2 } from "@/math";

export interface EmitterProps {
  position: Vector2;
  onMove(x: number, y: number): void;
}

const Emitter: React.FC<EmitterProps> = ({ position, onMove }) => {
  const ref = React.useRef<SVGCircleElement>(null);
  const [isMoving, setMoving] = React.useState(false);
  const pointerDown = React.useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      if (!ref.current) {
        return;
      }
      ref.current.setPointerCapture(e.pointerId);
      setMoving(true);
      e.stopPropagation();
      e.preventDefault();
    },
    [ref, setMoving]
  );
  const pointerMove = React.useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      if (!isMoving) {
        return false;
      }
      onMove(e.clientX, e.clientY);
      e.stopPropagation();
      e.preventDefault();
    },
    [isMoving]
  );
  const pointerUp = React.useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
      if (!ref.current) {
        return;
      }
      ref.current.releasePointerCapture(e.pointerId);
      setMoving(false);
      e.stopPropagation();
      e.preventDefault();
    },
    [ref, setMoving]
  );
  return (
    <circle
      ref={ref}
      fill="grey"
      r={5}
      cx={position.x}
      cy={position.y}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
    />
  );
};

export default Emitter;
