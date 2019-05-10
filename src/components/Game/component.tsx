import * as React from "react";
import useComponentSize from "@rehooks/component-size";
import injectSheets from "react-jss";

import { createStyles, WithStyles } from "@/theme";

import { Vector2, VEC_ZERO, magnitude, subtract } from "@/math";

import usePointerDrag, { DragEvent } from "@/hooks/use-pointer-drag";

import BallField from "../BallField";
import BouncerField from "../BouncerField";
import EmitterField from "../EmitterField";
import GravityDirectionSlider from "../GravityDirectionSlider";
import ResetButton from "../ResetButton";

export interface GameProps {
  className?: string;
  onCreateBouncer(p1: Vector2, p2: Vector2): void;
  onResize(x: number, y: number): void;
}

const styles = createStyles({
  svg: {
    touchAction: "none"
  }
});

type Props = GameProps & WithStyles<typeof styles>;
const Game: React.FC<Props> = ({
  className,
  classes,
  onCreateBouncer,
  onResize
}) => {
  const rootRef = React.useRef(null);
  const svgRef = React.useRef(null);

  const createBouncerDragRelease = React.useCallback(
    (e: DragEvent) => {
      const start = { x: e.start.clientX, y: e.start.clientY };
      const end = { x: e.clientX, y: e.clientY };
      const length = Math.abs(magnitude(subtract(start, end)));
      if (length >= 10) {
        onCreateBouncer(start, end);
      }
    },
    [onCreateBouncer]
  );

  const createBouncer = usePointerDrag(
    createBouncerDragRelease,
    undefined,
    target => target === svgRef.current
  );

  const [oldSize, setOldSize] = React.useState(VEC_ZERO);
  const size = useComponentSize(rootRef);
  if (size.width !== oldSize.x || size.height !== oldSize.y) {
    setOldSize({ x: size.width, y: size.height });
    onResize(size.width, size.height);
  }

  return (
    <div className={className} ref={rootRef}>
      <svg
        ref={svgRef}
        className={classes.svg}
        width={`${size.width}`}
        height={`${size.height}`}
        viewBox={`0 0 ${size.width} ${size.height}`}
        onPointerDown={createBouncer.pointerDown}
        onPointerMove={createBouncer.pointerMove}
        onPointerUp={createBouncer.pointerUp}
      >
        <GravityDirectionSlider
          r={15}
          cx={size.width - 35}
          cy={size.height - 35}
        />
        <ResetButton x={15} y={size.height - 35} onClick={() => {}} />
        <BallField />
        <BouncerField />
        <EmitterField />
        {createBouncer.start && createBouncer.end && (
          <line
            x1={createBouncer.start.clientX}
            y1={createBouncer.start.clientY}
            x2={createBouncer.end.clientX}
            y2={createBouncer.end.clientY}
            stroke="darkgrey"
          />
        )}
      </svg>
    </div>
  );
};
export default injectSheets(styles)(Game);
