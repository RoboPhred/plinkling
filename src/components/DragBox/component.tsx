import * as React from "react";
import injectSheet from "react-jss";

import { createStyles, WithStyles } from "@/theme";

export interface DragBoxProps {
  x: number;
  y: number;
  onDrag(x: number, y: number): void;
}

const styles = createStyles({
  rect: {
    cursor: "pointer"
  }
});

type Props = DragBoxProps & WithStyles<typeof styles>;
const DragBox: React.FC<Props> = ({ x, y, classes, onDrag }) => {
  const ref = React.useRef<SVGRectElement>(null);
  const [isMoving, setMoving] = React.useState(false);
  const pointerDown = React.useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      if (!ref.current) {
        return;
      }
      ref.current.setPointerCapture(e.pointerId);
      setMoving(true);
      e.stopPropagation();
      e.preventDefault();
    },
    [ref, setMoving]
  );
  const pointerMove = React.useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      if (!isMoving) {
        return false;
      }
      onDrag(e.clientX, e.clientY);
      e.stopPropagation();
      e.preventDefault();
    },
    [isMoving]
  );
  const pointerUp = React.useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      if (!ref.current) {
        return;
      }
      ref.current.releasePointerCapture(e.pointerId);
      setMoving(false);
      e.stopPropagation();
      e.preventDefault();
    },
    [ref, setMoving]
  );
  return (
    <rect
      className={classes.rect}
      ref={ref}
      x={x - 6}
      y={y - 6}
      width={12}
      height={12}
      fill="darkgrey"
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
    />
  );
};

export default injectSheet(styles)(DragBox);
