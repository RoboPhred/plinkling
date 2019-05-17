import * as React from "react";
import injectSheet from "react-jss";

import { Vector2 } from "@/math";
import { createStyles, WithStyles } from "@/theme";

import usePointerDrag, { DragEvent } from "@/hooks/use-pointer-drag";
import useGameCoords from "@/hooks/use-game-coords";

import RadialSvgSlider from "../RadialSvgSlider";
import AngleSvgSlider from "../AngleSvgSlider";
import MouseReveal from "../MouseReveal";

export interface EmitterProps {
  position: Vector2;
  rate: number;
  angle: number;
  onMove(x: number, y: number): void;
  onSetRate(rate: number): void;
  onSetDirection(angle: number): void;
}

const styles = createStyles({
  circle: {
    cursor: "pointer"
  }
});

type Props = EmitterProps & WithStyles<typeof styles>;
const Emitter: React.FC<Props> = ({
  classes,
  position,
  rate,
  angle,
  onMove,
  onSetRate,
  onSetDirection
}) => {
  const getGameCoords = useGameCoords();

  const onDragMove = React.useCallback(
    (e: DragEvent) => {
      const pt = getGameCoords({ x: e.clientX, y: e.clientY });
      onMove(pt.x, pt.y);
    },
    [onMove, getGameCoords]
  );

  const dragMove = usePointerDrag(null, onDragMove);

  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      <circle
        className={classes.circle}
        fill="grey"
        r={5}
        cx={0}
        cy={0}
        onPointerDown={dragMove.pointerDown}
        onPointerMove={dragMove.pointerMove}
        onPointerUp={dragMove.pointerUp}
      />
      <MouseReveal originVec={position}>
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
      </MouseReveal>
    </g>
  );
};

export default injectSheet(styles)(Emitter);
