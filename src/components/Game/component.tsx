import * as React from "react";

import { VEC_ZERO, Vector2 } from "@/math";

import BallField from "../BallField";
import BouncerField from "../BouncerField";

export interface GameProps {
  onCreateBouncer(p1: Vector2, p2: Vector2): void;
}

const Game: React.FC<GameProps> = ({ onCreateBouncer }) => {
  const [newBouncerStart, setNewBouncerStart] = React.useState<Vector2 | null>(
    null
  );
  const [newBouncerEnd, setNewBouncerEnd] = React.useState<Vector2 | null>(
    null
  );
  const mouseDown = React.useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      setNewBouncerStart({ x: e.clientX, y: e.clientY });
      setNewBouncerEnd({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    },
    [setNewBouncerStart, setNewBouncerEnd]
  );
  const mouseMove = React.useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      setNewBouncerEnd({ x: e.clientX, y: e.clientY });
    },
    [setNewBouncerEnd]
  );
  const mouseUp = React.useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      if (newBouncerStart == null) {
        return;
      }
      onCreateBouncer(newBouncerStart, { x: e.clientX, y: e.clientY });
      setNewBouncerStart(null);
      setNewBouncerEnd(null);
      e.preventDefault();
    },
    [newBouncerStart, setNewBouncerStart, setNewBouncerEnd, onCreateBouncer]
  );

  return (
    <div>
      <svg
        width="1000"
        height="1000"
        viewBox="0 0 1000 1000"
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
      >
        <BallField />
        <BouncerField />
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
