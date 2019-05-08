import * as React from "react";
import injectSheet from "react-jss";

import { constrain, Vector2, angle, VEC_X } from "@/math";

import { createStyles, WithStyles } from "@/theme";

export interface RadialSvgSliderProps {
  cx: number;
  cy: number;
  r: number;
  min: number;
  max: number;
  value: number;
  onChange(value: number): void;
}

const styles = createStyles({
  handle: {
    cursor: "pointer"
  }
});

const startAngle = Math.PI * (1 / 3);
const endAngle = Math.PI * (2 / 3);
const range = Math.PI * 2 - (endAngle - startAngle);

type Props = RadialSvgSliderProps & WithStyles<typeof styles>;
const RadialSvgSlider: React.FC<Props> = ({
  cx,
  cy,
  r,
  min,
  max,
  value,
  classes,
  onChange
}) => {
  const percent = constrain((value - min) / (max - min), 0, 1);
  const rootRef = React.useRef<SVGPathElement>(null);
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
      const handleAngle = angle(VEC_X, handleVec);
      let valueAngle = startAngle - handleAngle;
      if (valueAngle < 0) {
        valueAngle += Math.PI * 2;
      }
      const percent = constrain(valueAngle / range, 0, 1);
      onChange(min + (max - min) * percent);
      e.preventDefault();
      e.stopPropagation();
    },
    [isPointerDown, rootRef, min, max, onChange]
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
      <path
        ref={rootRef}
        d={generatePath(cx, cy, r)}
        stroke="dimgrey"
        strokeWidth={2}
        fill="none"
      />
      <path
        className={classes.handle}
        ref={handleRef}
        d={generateHandlePath(cx, cy, r, percent)}
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

export default injectSheet(styles)(RadialSvgSlider);

function generatePath(cx: number, cy: number, r: number): string {
  return [
    "M",
    cx + Math.cos(startAngle) * r,
    cy + Math.sin(startAngle) * r,
    "A",
    r,
    r,
    0,
    1, //large
    0,
    cx + Math.cos(endAngle) * r,
    cy + Math.sin(endAngle) * r
  ].join(" ");
}

function generateHandlePath(
  cx: number,
  cy: number,
  r: number,
  percent: number
): string {
  const angle = startAngle - range * percent;
  return [
    "M",
    cx + Math.cos(angle) * (r - 6),
    cy + Math.sin(angle) * (r - 6),
    "L",
    cx + Math.cos(angle) * (r + 6),
    cy + Math.sin(angle) * (r + 6)
  ].join(" ");
}
