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
  magnitude,
  VEC_X,
  subtract
} from "@/math";
import { isNotNull } from "@/utils";
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
  const movementVec: Vector2 = subtract(movementLine.p1, movementLine.p2);
  const interceptData = interceptBouncer(movementLine, state);

  if (interceptData) {
    const { bouncerId, intercept } = interceptData;
    const bouncer = state.bouncersById[bouncerId];

    const interceptAngle = angle(subtract(bouncer.p2, bouncer.p1), movementVec);
    const lineAngle = angle(VEC_X, subtract(bouncer.p2, bouncer.p1));
    const bounceAngle = lineAngle + (Math.PI - interceptAngle);

    let reflect = Math.abs(
      length(movementLine) - length({ p1: ball.position, p2: intercept })
    );
    reflect = Math.max(reflect, 1);

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
