import * as React from "react";

export interface DragBoxProps {
  x: number;
  y: number;
  onDrag(x: number, y: number): void;
}

const DragBox: React.FC<DragBoxProps> = ({ x, y, onDrag }) => {
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
      // onDrag(e.clientX, e.clientY);
      e.stopPropagation();
      e.preventDefault();
    },
    [ref, setMoving]
  );
  return (
    <rect
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

export default DragBox;
