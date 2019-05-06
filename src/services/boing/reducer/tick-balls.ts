import { AnyAction } from "redux";
import { first } from "lodash-es";

import {
  add,
  scale,
  Line,
  intercept,
  length,
  Vector2,
  angle,
  vector,
  magnitude
} from "@/math";
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
  const { gravity, fieldMin, fieldMax } = state;

  let velocity = add(ball.velocity, scale(gravity, millisElapsed));
  let position = add(ball.position, velocity);

  if (
    position.x < fieldMin.x ||
    position.x > fieldMax.x ||
    position.y > fieldMax.y
  ) {
    return null;
  }

  // Trace a line from the ball's previous position to the
  //  current position, then see if it intercepts a bouncer
  const movementLine: Line = { p1: ball.position, p2: position };
  const interceptData = interceptBouncer(movementLine, state);

  if (interceptData) {
    const { bouncerId, intercept } = interceptData;
    const bouncer = state.bouncers[bouncerId];
    const interceptAngle = angle(
      {
        x: bouncer.p2.x - bouncer.p1.x,
        y: bouncer.p2.y - bouncer.p1.y
      },
      {
        x: movementLine.p2.x - movementLine.p1.x,
        y: movementLine.p2.y - movementLine.p1.y
      }
    );

    const bounceAngle = Math.PI * 2 - interceptAngle;

    const reflect =
      length(movementLine) - length({ p1: ball.position, p2: intercept });

    position = add(intercept, vector(bounceAngle, reflect));
    velocity = vector(bounceAngle, magnitude(velocity));
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
): { bouncerId: string; intercept: Vector2 } | null {
  const intercepts = values(state.bouncers)
    .map(bouncer => {
      const i = intercept(line, bouncer);
      if (i) {
        return {
          bouncerId: bouncer.id,
          intercept: i
        };
      }
      return null;
    })
    .filter(isNotNull);
  return first(intercepts) || null;
}
