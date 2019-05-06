import { AnyAction } from "redux";
import { first } from "lodash-es";

import { add, scale, Line, intercept, length, Vector2 } from "@/math";
import { mapOrRemove, isNotNull } from "@/utils";
import { values } from "@/identity";

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
    balls: mapOrRemove(state.balls, ball =>
      tickBall(ball, millisElapsed, state)
    )
  };
}

function tickBall(
  ball: BallState,
  millisElapsed: number,
  state: BoingServiceState
): BallState | null {
  const { gravity, fieldSize } = state;

  let velocity = add(ball.velocity, scale(gravity, millisElapsed));
  let position = add(ball.position, velocity);

  if (position.x < 0 || position.x > fieldSize.x || position.y > fieldSize.y) {
    return null;
  }

  // Trace a line from the ball's previous position to the
  //  current position, then see if it intercepts a bouncer
  const movementLine: Line = { p1: ball.position, p2: position };
  const intercept = interceptBouncer(movementLine, state);

  if (intercept) {
    // TODO: bounce ball off intercept point.
    //  Need to get the angle of intercept relative to bouncer

    const remainder =
      length(movementLine) - length({ p1: ball.position, p2: intercept });
    position = { x: intercept.x, y: intercept.y - remainder };
    velocity = scale(velocity, -1);
  }

  return {
    ...ball,
    position,
    velocity
  };
}

function interceptBouncer(
  line: Line,
  state: BoingServiceState
): Vector2 | null {
  const intercepts = values(state.bouncers)
    .map(bouncer => intercept(line, bouncer))
    .filter(isNotNull);
  return first(intercepts) || null;
}
