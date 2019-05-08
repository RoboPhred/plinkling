import * as React from "react";
import injectSheet from "react-jss";

import { createStyles, WithStyles } from "@/theme";

export interface DragHandleProps {
  x: number;
  y: number;
  onDrag(x: number, y: number): void;
}

const styles = createStyles({
  rect: {
    cursor: "pointer"
  }
});

type Props = DragHandleProps & WithStyles<typeof styles>;
const DragHandle: React.FC<Props> = ({ x, y, classes, onDrag }) => {
  const ref = React.useRef<SVGCircleElement>(null);
  const [isMoving, setMoving] = React.useState(false);
  const pointerDown = React.useCallback(
    (e: React.PointerEvent<SVGCircleElement>) => {
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
    (e: React.PointerEvent<SVGCircleElement>) => {
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
    (e: React.PointerEvent<SVGCircleElement>) => {
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
    <circle
      className={classes.rect}
      ref={ref}
      cx={x}
      cy={y}
      r={6}
      fill="darkgrey"
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
    />
  );
};

export default injectSheet(styles)(DragHandle);
