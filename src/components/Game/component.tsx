import * as React from "react";
import useComponentSize from "@rehooks/component-size";

import { Vector2, VEC_ZERO, magnitude, subtract } from "@/math";

import BallField from "../BallField";
import BouncerField from "../BouncerField";
import EmitterField from "../EmitterField";
import GravitySlider from "../GravitySlider";

export interface GameProps {
  className?: string;
  onCreateBouncer(p1: Vector2, p2: Vector2): void;
  onResize(x: number, y: number): void;
}

const Game: React.FC<GameProps> = ({
  className,
  onCreateBouncer,
  onResize
}) => {
  const [newBouncerStart, setNewBouncerStart] = React.useState<Vector2 | null>(
    null
  );
  const [newBouncerEnd, setNewBouncerEnd] = React.useState<Vector2 | null>(
    null
  );
  const pointerDown = React.useCallback(
    (e: React.PointerEvent<SVGElement>) => {
      setNewBouncerStart({ x: e.clientX, y: e.clientY });
      setNewBouncerEnd({ x: e.clientX, y: e.clientY });
      e.stopPropagation();
      e.preventDefault();
    },
    [setNewBouncerStart, setNewBouncerEnd]
  );
  const pointerMove = React.useCallback(
    (e: React.PointerEvent<SVGElement>) => {
      setNewBouncerEnd({ x: e.clientX, y: e.clientY });
    },
    [setNewBouncerEnd]
  );
  const pointerUp = React.useCallback(
    (e: React.PointerEvent<SVGElement>) => {
      if (newBouncerStart == null) {
        return;
      }
      const newBouncerFinal = { x: e.clientX, y: e.clientY };
      const length = Math.abs(
        magnitude(subtract(newBouncerStart, newBouncerFinal))
      );
      if (length >= 50) {
        onCreateBouncer(newBouncerStart, newBouncerFinal);
      }
      setNewBouncerStart(null);
      setNewBouncerEnd(null);
      e.stopPropagation();
      e.preventDefault();
    },
    [newBouncerStart, setNewBouncerStart, setNewBouncerEnd, onCreateBouncer]
  );

  const ref = React.useRef(null);
  const [oldSize, setOldSize] = React.useState(VEC_ZERO);
  const size = useComponentSize(ref);
  if (size.width !== oldSize.x || size.height !== oldSize.y) {
    setOldSize({ x: size.width, y: size.height });
    onResize(size.width, size.height);
  }

  return (
    <div className={className} ref={ref}>
      <svg
        width={`${size.width}`}
        height={`${size.height}`}
        viewBox={`0 0 ${size.width} ${size.height}`}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
      >
        <GravitySlider r={15} cx={size.width - 35} cy={size.height - 35} />
        <BallField />
        <BouncerField />
        <EmitterField />
        {newBouncerStart && newBouncerEnd && (
          <line
            x1={newBouncerStart.x}
            y1={newBouncerStart.y}
            x2={newBouncerEnd.x}
            y2={newBouncerEnd.y}
            stroke="darkgrey"
          />
        )}
      </svg>
    </div>
  );
};
export default Game;
