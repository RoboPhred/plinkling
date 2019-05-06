import { AnyAction } from "redux";
import { first } from "lodash-es";

import { add, scale, Line, intercept, Vector2 } from "@/math";
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

  const removeThresh = scale(fieldSize, 1.1);

  let velocity = add(ball.velocity, scale(gravity, millisElapsed));
  let position = add(ball.position, velocity);

  if (position.x > removeThresh.x || position.y > removeThresh.y) {
    return null;
  }

  // Trace a line from the ball's previous position to the
  //  current position, then see if it intercepts a bouncer
  const intercept = interceptBouncer(
    { p1: ball.position, p2: position },
    state
  );

  if (intercept) {
    // TODO: bounce ball off intercept point.
    //  Need to get the angle of intercept relative to bouncer
    // Also should recalculate position for the remaining movement after the bounce

    // Currently just inverting direction and latching to bounce point.
    position = intercept;
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
