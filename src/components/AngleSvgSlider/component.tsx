import * as React from "react";
import injectSheet from "react-jss";

import { createStyles, WithStyles } from "@/theme";
import { VEC_X, Vector2, angle } from "@/math";

export interface AngleSvgSliderProps {
  cx: number;
  cy: number;
  r: number;
  value: number;
  onChange(value: number): void;
}

const styles = createStyles({
  handle: {
    cursor: "pointer"
  }
});

type Props = AngleSvgSliderProps & WithStyles<typeof styles>;
const AngleSvgSlider: React.FC<Props> = ({
  cx,
  cy,
  r,
  value,
  classes,
  onChange
}) => {
  console.log(value);
  const rootRef = React.useRef<SVGCircleElement>(null);
  const handleRef = React.useRef<SVGPathElement>(null);
  const [isPointerDown, setPointerDown] = React.useState(false);
  const onHandlePointerDown = React.useCallback(
    (e: React.PointerEvent<SVGPathElement>) => {
      if (!handleRef.current) {
        return;
      }
      setPointerDown(true);
      handleRef.current.setPointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
    },
    [handleRef]
  );
  const onHandlePointerMove = React.useCallback(
    (e: React.PointerEvent<SVGPathElement>) => {
      if (!isPointerDown || !rootRef.current) {
        return;
      }
      const box = rootRef.current.getBoundingClientRect();
      const handleVec: Vector2 = {
        x: e.clientX - (box.left + box.width / 2),
        y: e.clientY - (box.top + box.height / 2)
      };
      let handleAngle = angle(VEC_X, handleVec);
      if (handleAngle < 0) {
        handleAngle += Math.PI * 2;
      }
      onChange(handleAngle);
      e.preventDefault();
      e.stopPropagation();
    },
    [isPointerDown, rootRef, onChange]
  );
  const onHandlePointerUp = React.useCallback(
    (e: React.PointerEvent<SVGPathElement>) => {
      if (!handleRef.current) {
        return;
      }
      setPointerDown(false);
      handleRef.current.releasePointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
    },
    [handleRef]
  );
  return (
    <g>
      <circle
        ref={rootRef}
        cx={cx}
        cy={cy}
        r={r}
        stroke="grey"
        fill="none"
        strokeWidth={2}
      />
      <path
        ref={handleRef}
        className={classes.handle}
        d={generateHandlePath(cx, cy, r, value)}
        stroke="red"
        strokeWidth={5}
        fill="none"
        onPointerDown={onHandlePointerDown}
        onPointerMove={onHandlePointerMove}
        onPointerUp={onHandlePointerUp}
      />
    </g>
  );
};

export default injectSheet(styles)(AngleSvgSlider);

function generateHandlePath(
  cx: number,
  cy: number,
  r: number,
  angle: number
): string {
  return [
    "M",
    cx + Math.cos(angle) * (r - 6),
    cy + Math.sin(angle) * (r - 6),
    "L",
    cx + Math.cos(angle) * (r + 6),
    cy + Math.sin(angle) * (r + 6)
  ].join(" ");
}
