import { Vector2, Line } from "@/math";
import { SECOND_AS_MILLIS } from "@/time";
import { IdentityObject, IdentityCollection } from "@/identity";

export interface BallState extends IdentityObject {
  position: Vector2;
  velocity: Vector2;
}

export interface EmitterState extends IdentityObject {
  position: Vector2;
  rate: number;
  lastEmit: number;
}

export interface BouncerState extends IdentityObject, Line {}

export interface BoingServiceState {
  tick: number;
  gravity: Vector2;
  fieldMin: Vector2;
  fieldMax: Vector2;
  balls: IdentityCollection<BallState>;
  emitters: IdentityCollection<EmitterState>;
  bouncers: IdentityCollection<BouncerState>;
}

export const defaultBoingServiceState: Readonly<
  BoingServiceState
> = Object.freeze({
  tick: 0,
  gravity: { x: 0, y: 9.8 / SECOND_AS_MILLIS },
  fieldMin: { x: -1000, y: -1000 },
  fieldMax: { x: 1000, y: 1000 },
  balls: {
    // a: {
    //   id: "a",
    //   position: { x: 0, y: 0 },
    //   velocity: { x: 0, y: 0 }
    // }
  },
  emitters: {
    a: {
      id: "a",
      position: { x: 0, y: 0 },
      rate: 1000,
      lastEmit: 0
    }
  },
  bouncers: {
    a: {
      id: "a",
      p1: {
        x: -100,
        y: 800
      },
      p2: {
        x: 100,
        y: 850
      }
    }
  }
});
