import * as React from "react";

import { Vector2 } from "@/math";

import RadialSvgSlider from "@/components/RadialSvgSlider";

export interface EmitterProps {
  position: Vector2;
  rate: number;
  onMove(x: number, y: number): void;
  onSetRate(rate: number): void;
}

const Emitter: React.FC<EmitterProps> = ({
  position,
  rate,
  onMove,
  onSetRate
}) => {
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
      <RadialSvgSlider
        cx={0}
        cy={0}
        r={15}
        min={250}
        max={3000}
        value={rate}
        onChange={onSetRate}
      />
    </g>
  );
};

export default Emitter;
