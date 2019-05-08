import * as React from "react";
import useComponentSize from "@rehooks/component-size";
import injectSheets from "react-jss";

import { createStyles, WithStyles } from "@/theme";

import { Vector2, VEC_ZERO, magnitude, subtract } from "@/math";

import usePointerDrag, { DragEvent } from "@/hooks/use-pointer-drag";

import BallField from "../BallField";
import BouncerField from "../BouncerField";
import EmitterField from "../EmitterField";
import GravitySlider from "../GravitySlider";

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
  const createBouncerDragRelease = React.useCallback(
    (e: DragEvent) => {
      const start = { x: e.start.clientX, y: e.start.clientY };
      const end = { x: e.clientX, y: e.clientY };
      const length = Math.abs(magnitude(subtract(start, end)));
      if (length >= 50) {
        onCreateBouncer(start, end);
      }
    },
    [onCreateBouncer]
  );

  const useBouncerPointer = usePointerDrag(createBouncerDragRelease);

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
        className={classes.svg}
        width={`${size.width}`}
        height={`${size.height}`}
        viewBox={`0 0 ${size.width} ${size.height}`}
        onPointerDown={useBouncerPointer.pointerDown}
        onPointerMove={useBouncerPointer.pointerMove}
        onPointerUp={useBouncerPointer.pointerUp}
      >
        <GravitySlider r={15} cx={size.width - 35} cy={size.height - 35} />
        <BallField />
        <BouncerField />
        <EmitterField />
        {useBouncerPointer.start && useBouncerPointer.end && (
          <line
            x1={useBouncerPointer.start.clientX}
            y1={useBouncerPointer.start.clientY}
            x2={useBouncerPointer.end.clientX}
            y2={useBouncerPointer.end.clientY}
            stroke="darkgrey"
          />
        )}
      </svg>
    </div>
  );
};
export default injectSheets(styles)(Game);
