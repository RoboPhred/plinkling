import * as React from "react";

import Tone from "@/tone";
import { Vector2, constrain, length } from "@/math";

import DragHandle from "../DragHandle";

const synth = new Tone.PolySynth(6, Tone.AMSynth).toMaster();

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
    synth.triggerAttackRelease(getTone(length({ p1, p2 })), "32n");
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

  return (
    <g>
      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="black" />
      <DragHandle x={p1.x} y={p1.y} onDrag={onP1Move} />
      <DragHandle x={p2.x} y={p2.y} onDrag={onP2Move} />
    </g>
  );
};

const TONE_MIN = 50;
const TONE_MAX = 1000;

const LENGTH_MIN = 50;
const LENGTH_MAX = 500;
function getTone(length: number): number {
  // (length - minLength ) / (maxLength) = (tone - minTone) / (maxTone)
  // (length - minLength) / maxLength * maxTone = tone - minTone
  length = LENGTH_MAX - constrain(length, LENGTH_MIN, LENGTH_MAX);
  return (
    ((length - LENGTH_MIN) / (LENGTH_MAX - LENGTH_MIN)) *
      (TONE_MAX - TONE_MIN) +
    TONE_MIN
  );
}

export default Bouncer;
