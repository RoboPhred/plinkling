import * as React from "react";

import { Vector2 } from "@/math";

export interface ClientPos {
  clientX: number;
  clientY: number;
}

export interface DragEvent {
  clientX: number;
  clientY: number;
  start: ClientPos;
  dX: number;
  dY: number;
}

export interface UsePointerEvents {
  start: ClientPos | null;
  end: ClientPos | null;
  pointerDown(e: React.PointerEvent<Element>): void;
  pointerMove(e: React.PointerEvent<Element>): void;
  pointerUp(e: React.PointerEvent<Element>): void;
}

export default function usePointerDrag(
  onDragComplete: ((e: DragEvent) => void) | null,
  onMove?: (e: DragEvent) => void,
  shouldCapture?: (target: EventTarget) => boolean
) {
  const [mouseDown, setMouseDown] = React.useState<Vector2 | null>(null);
  const [mouseMove, setMouseMove] = React.useState<Vector2 | null>(null);

  const pointerDown = React.useCallback((e: React.PointerEvent<Element>) => {
    if (shouldCapture && !shouldCapture(e.target)) {
      return;
    }

    setMouseDown({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);

    e.preventDefault();
    e.stopPropagation();
  }, []);

  const pointerMove = React.useCallback(
    (e: React.PointerEvent<Element>) => {
      if (!mouseDown) {
        return;
      }

      if (onMove) {
        const ev: DragEvent = {
          start: {
            clientX: mouseDown.x,
            clientY: mouseDown.y
          },
          clientX: e.clientX,
          clientY: e.clientY,
          dX: e.clientX - mouseDown.x,
          dY: e.clientY - mouseDown.y
        };
        onMove(ev);
      }

      setMouseMove({ x: e.clientX, y: e.clientY });

      e.preventDefault();
    },
    [mouseDown, onMove]
  );

  const pointerUp = React.useCallback(
    (e: React.PointerEvent<Element>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);

      if (mouseDown) {
        if (onDragComplete) {
          const ev: DragEvent = {
            start: {
              clientX: mouseDown.x,
              clientY: mouseDown.y
            },
            clientX: e.clientX,
            clientY: e.clientY,
            dX: e.clientX - mouseDown.x,
            dY: e.clientY - mouseDown.y
          };
          onDragComplete(ev);
        }

        setMouseDown(null);
        setMouseMove(null);

        e.preventDefault();
        e.stopPropagation();
      }
    },
    [onDragComplete, mouseDown]
  );

  return {
    start: mouseDown ? { clientX: mouseDown.x, clientY: mouseDown.y } : null,
    end: mouseMove ? { clientX: mouseMove.x, clientY: mouseMove.y } : null,
    pointerDown,
    pointerMove,
    pointerUp
  };
}
