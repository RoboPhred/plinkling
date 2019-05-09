import * as React from "react";

import { Vector2 } from "@/math";

import RadialSvgSlider from "@/components/RadialSvgSlider";
import usePointerDrag, { DragEvent } from "@/hooks/use-pointer-drag";
import AngleSvgSlider from "../AngleSvgSlider";

export interface EmitterProps {
  position: Vector2;
  rate: number;
  angle: number;
  onMove(x: number, y: number): void;
  onSetRate(rate: number): void;
  onSetDirection(angle: number): void;
}

const Emitter: React.FC<EmitterProps> = ({
  position,
  rate,
  angle,
  onMove,
  onSetRate,
  onSetDirection
}) => {
  const onDragMove = React.useCallback(
    (e: DragEvent) => {
      onMove(e.clientX, e.clientY);
    },
    [onMove]
  );

  const dragMove = usePointerDrag(null, onDragMove);

  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      <circle
        fill="grey"
        r={5}
        cx={0}
        cy={0}
        onPointerDown={dragMove.pointerDown}
        onPointerMove={dragMove.pointerMove}
        onPointerUp={dragMove.pointerUp}
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
      <AngleSvgSlider
        cx={0}
        cy={0}
        r={30}
        value={angle}
        onChange={onSetDirection}
      />
    </g>
  );
};

export default Emitter;
