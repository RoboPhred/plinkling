import { AnyAction } from "redux";
import uuid from "uuid/v4";

import { BoingServiceState, defaultBoingServiceState } from "../state";

import { identities } from "@/identity";
import { Vector2, VEC_ZERO } from "@/math";

import { isTickAction } from "../actions/tick";

export default function tickEmittersReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (!isTickAction(action)) {
    return state;
  }

  for (const emitterId of identities(state.emitters)) {
    const emitter = state.emitters[emitterId];
    if (state.tick - emitter.lastEmit >= emitter.rate) {
      const newBallId = uuid();
      state = {
        ...state,
        emitters: {
          ...state.emitters,
          [emitterId]: {
            ...state.emitters[emitterId],
            lastEmit: state.tick
          }
        },
        balls: {
          ...state.balls,
          [newBallId]: {
            id: newBallId,
            position: emitter.position,
            velocity: VEC_ZERO
          }
        }
      };
    }
  }

  return state;
}