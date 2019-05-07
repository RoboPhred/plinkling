import { AnyAction } from "redux";
import { first } from "lodash";
import { set, unset } from "lodash/fp";

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
import { values, identities } from "@/identity";

import {
  BoingServiceState,
  defaultBoingServiceState,
  BallState,
  BouncerState
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

  const ballIds = identities(state.ballsById);

  state = ballIds.reduce(
    (state, id) => tickBall(state, id, millisElapsed),
    state
  );

  return state;
}

function tickBall(
  state: BoingServiceState,
  ballId: string,
  millisElapsed: number
): BoingServiceState {
  const { gravity, fieldMin, fieldMax, ballsById: balls } = state;
  const ball = balls[ballId];

  let velocity = add(ball.velocity, scale(gravity, millisElapsed));
  let position = add(ball.position, velocity);

  if (
    position.x < fieldMin.x ||
    position.x > fieldMax.x ||
    position.y > fieldMax.y
  ) {
    return unset(["ballsById", ballId], state);
  }

  // Trace a line from the ball's previous position to the
  //  current position, then see if it intercepts a bouncer
  const movementLine: Line = { p1: ball.position, p2: position };
  const interceptData = interceptBouncer(movementLine, state);

  if (interceptData) {
    const { bouncerId, intercept } = interceptData;
    const bouncer = state.bouncersById[bouncerId];
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

    const reflect = Math.abs(
      length(movementLine) - length({ p1: ball.position, p2: intercept })
    );

    position = add(intercept, vector(bounceAngle, reflect));
    velocity = vector(bounceAngle, magnitude(velocity));

    const bouncerState: BouncerState = {
      ...bouncer,
      toneTriggerTimestamp: Date.now()
    };
    Object.freeze(bouncerState);
    Object.freeze(bouncerState.p1);
    Object.freeze(bouncerState.p2);

    state = set(["bouncersById", bouncerId], bouncerState, state);
  }

  const ballState: BallState = {
    ...ball,
    position,
    velocity
  };
  Object.freeze(ballState);

  state = set(["ballsById", ballId], ballState, state);

  return state;
}

function interceptBouncer(
  line: Line,
  state: BoingServiceState
): { bouncerId: string; intercept: Vector2 } | null {
  const intercepts = values(state.bouncersById)
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
