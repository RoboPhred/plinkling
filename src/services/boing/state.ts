import { Vector2, Line, VEC_ZERO } from "@/math";
import { SECOND_AS_MILLIS } from "@/time";
import { IdentityObject, IdentityCollection } from "@/identity";

export interface BallState extends IdentityObject {
  position: Vector2;
  velocity: Vector2;
}
export const defaultBallState = Object.freeze({
  position: VEC_ZERO,
  velocity: VEC_ZERO
});

export interface EmitterState extends IdentityObject {
  position: Vector2;
  rate: number;
  velocity: Vector2;
  lastEmit: number;
}

export const defaultEmitterState = Object.freeze({
  position: VEC_ZERO,
  rate: 1000,
  velocity: VEC_ZERO,
  lastEmit: 0
});

export interface BouncerState extends IdentityObject, Line {
  toneTriggerTimestamp: number;
}

export const defaultBouncerState = Object.freeze({
  toneTriggerTimestamp: 0
});

export interface BoingServiceState {
  tick: number;
  gravity: Vector2;
  fieldMin: Vector2;
  fieldMax: Vector2;
  ballsById: IdentityCollection<BallState>;
  emittersById: IdentityCollection<EmitterState>;
  bouncersById: IdentityCollection<BouncerState>;
}

export const defaultBoingServiceState: Readonly<
  BoingServiceState
> = Object.freeze({
  tick: 0,
  gravity: VEC_ZERO, // gravity: { x: 0, y: 9.8 / SECOND_AS_MILLIS },
  fieldMin: { x: 0, y: 0 },
  fieldMax: { x: 1000, y: 1000 },
  ballsById: {},
  emittersById: {
    a: {
      ...defaultEmitterState,
      id: "a",
      position: { x: 100, y: 10 },
      velocity: { x: 0, y: 5 },
      rate: 1000
    }
  },
  bouncersById: {
    // b: {
    //   ...defaultBouncerState,
    //   id: "b",
    //   p1: {
    //     x: 0,
    //     y: 300
    //   },
    //   p2: {
    //     x: 200,
    //     y: 500
    //   }
    // }
  }
});
