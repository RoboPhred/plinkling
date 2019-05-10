import * as React from "react";

import playTone from "@/tone";
import { Vector2, constrain, length, subtract, add } from "@/math";

import DragHandle from "../DragHandle";
import MouseReveal from "../MouseReveal";

export interface BouncerProps {
  toneTriggerTimestamp: number;
  p1: Vector2;
  p2: Vector2;
  onMove(p1: Vector2, p2: Vector2): void;
}

const Bouncer: React.FC<BouncerProps> = ({
  p1,
  p2,
  toneTriggerTimestamp,
  onMove
}) => {
  const [lastTone, setLastTone] = React.useState(0);
  if (toneTriggerTimestamp > lastTone) {
    setLastTone(toneTriggerTimestamp);
    const l = length({ p1, p2 });
    const tone = getTone(l);
    playTone(tone, "32n");
  }

  const onP1Move = React.useCallback(
    (x: number, y: number) => {
      onMove({ x, y }, p2);
    },
    [onMove, p2]
  );

  const onP2Move = React.useCallback(
    (x: number, y: number) => {
      onMove(p1, { x, y });
    },
    [onMove, p1]
  );

  const center = {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };

  const onCenterMove = React.useCallback(
    (x: number, y: number) => {
      const pt = { x, y };
      const movement = subtract(pt, center);
      onMove(add(p1, movement), add(p2, movement));
    },
    [onMove, p1, [2]]
  );

  return (
    <g>
      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="black" />
      <MouseReveal originVec={p1} revealDistance={25}>
        <DragHandle x={p1.x} y={p1.y} onDrag={onP1Move} />
      </MouseReveal>
      <MouseReveal originVec={p2} revealDistance={25}>
        <DragHandle x={p2.x} y={p2.y} onDrag={onP2Move} />
      </MouseReveal>
      <MouseReveal originVec={center} revealDistance={25}>
        <DragHandle x={center.x} y={center.y} onDrag={onCenterMove} />
      </MouseReveal>
    </g>
  );
};

const TONE_MIN = 50;
const TONE_MAX = 1400;

const LENGTH_MIN = 50;
const LENGTH_MAX = 500;
function getTone(length: number): number {
  // (length - minLength ) / (maxLength) = (tone - minTone) / (maxTone)
  // (length - minLength) / maxLength * maxTone = tone - minTone
  length = constrain(LENGTH_MAX - length, LENGTH_MIN, LENGTH_MAX);
  return (
    ((length - LENGTH_MIN) / (LENGTH_MAX - LENGTH_MIN)) *
      (TONE_MAX - TONE_MIN) +
    TONE_MIN
  );
}

export default Bouncer;
