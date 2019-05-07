import * as React from "react";

import { Vector2 } from "@/math";

import CircularSvgSlider from "@/components/CircularSvgSlider";

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
    <g transform={`translate(${position.x}, ${position.y})`}>
      <circle
        ref={ref}
        fill="grey"
        r={5}
        cx={0}
        cy={0}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
      />
      <CircularSvgSlider
        cx={0}
        cy={0}
        r={15}
        text="test"
        min={0}
        max={100}
        value={50}
        onChange={() => {}}
      />
    </g>
  );
};

export default Emitter;
