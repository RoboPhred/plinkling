import { AnyAction } from "redux";

import { mapValues } from "lodash-es";

import { Vector2, add, scale } from "@/math";

import {
  BoingServiceState,
  defaultBoingServiceState,
  BallState
} from "../state";

import { isTickAction } from "../actions/tick";

export default function tickBallsReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (!isTickAction(action)) {
    return state;
  }

  const { millisElapsed } = action.payload;

  return {
    ...state,
    balls: mapValues(state.balls, ball =>
      tickBall(ball, millisElapsed, state.gravity)
    )
  };
}

function tickBall(
  ball: BallState,
  millisElapsed: number,
  gravity: Vector2
): BallState {
  const velocity = add(ball.velocity, scale(gravity, millisElapsed));
  const position = add(ball.position, velocity);
  return {
    ...ball,
    position,
    velocity
  };
}
