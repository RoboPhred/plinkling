import * as React from "react";

import { VEC_ZERO, Vector2 } from "@/math";

import BallField from "../BallField";
import BouncerField from "../BouncerField";

export interface GameProps {
  onCreateBouncer(p1: Vector2, p2: Vector2): void;
}

const Game: React.FC<GameProps> = ({ onCreateBouncer }) => {
  const [mousePos, setMousePos] = React.useState<Vector2>(VEC_ZERO);
  const mouseDown = React.useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    },
    [setMousePos]
  );
  const mouseUp = React.useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      onCreateBouncer(mousePos, { x: e.clientX, y: e.clientY });
      e.preventDefault();
    },
    [mousePos, onCreateBouncer]
  );

  return (
    <div>
      <svg
        width="1000"
        height="1000"
        viewBox="0 0 1000 1000"
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
      >
        <BallField />
        <BouncerField />
      </svg>
    </div>
  );
};
export default Game;
