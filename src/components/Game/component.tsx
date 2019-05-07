import * as React from "react";
import useComponentSize from "@rehooks/component-size";

import { Vector2, VEC_ZERO } from "@/math";

import BallField from "../BallField";
import BouncerField from "../BouncerField";
import EmitterField from "../EmitterField";

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
      onCreateBouncer(newBouncerStart, { x: e.clientX, y: e.clientY });
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
