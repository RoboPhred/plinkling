import * as React from "react";
import injectSheet from "react-jss";

import { constrain, Vector2, vector, angle } from "@/math";

import { createStyles, WithStyles } from "@/theme";

/*
This needs a serious cleanup.
It was done in a few minutes on a trial and error basis.

- Fix start angle and end angle being odd negative values.
- Figure out the real logic for pointer move / angle to percentage.
  Lots of arbitrary trial and error changes in there
  Why does the starting angle need to be negated again?
  Fix value latching to zero if angle is taken out of range.
  Latch to max if slightly out of max range, and min if slightly
  out of min range.
*/

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

const startAngle = -Math.PI * (1 / 3);
const endAngle = -Math.PI * (2 / 3);
const range = Math.PI * 2 - Math.abs(endAngle - startAngle);

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
  const sliderRef = React.useRef<SVGPathElement>(null);
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
      if (!isPointerDown) {
        return;
      }
      if (!sliderRef.current) {
        return;
      }

      const box = sliderRef.current.getBoundingClientRect() as DOMRect;
      const handleVec: Vector2 = {
        x: e.clientX - (box.x + box.width / 2),
        y: e.clientY - (box.y + box.height / 2)
      };
      const relVec = vector(-startAngle, 1);
      let handleAngle = angle(handleVec, relVec);
      if (handleAngle < 0) {
        handleAngle += Math.PI * 2;
      }
      const percent = constrain(handleAngle / range, 0, 1);
      console.log(percent);
      onChange(min + (max - min) * percent);
      e.preventDefault();
      e.stopPropagation();
    },
    [isPointerDown, min, max, onChange]
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
        ref={sliderRef}
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
    cy - Math.sin(startAngle) * r,
    "A",
    r,
    r,
    0,
    1, //large
    0,
    cx + Math.cos(endAngle) * r,
    cy - Math.sin(endAngle) * r
  ].join(" ");
}

function generateHandlePath(
  cx: number,
  cy: number,
  r: number,
  percent: number
): string {
  const angle = startAngle + range * percent;
  return [
    "M",
    cx + Math.cos(angle) * (r - 6),
    cy - Math.sin(angle) * (r - 6),
    "L",
    cx + Math.cos(angle) * (r + 6),
    cy - Math.sin(angle) * (r + 6)
  ].join(" ");
}
