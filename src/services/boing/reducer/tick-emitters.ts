import { AnyAction } from "redux";
import uuid from "uuid/v4";

import {
  BoingServiceState,
  defaultBoingServiceState,
  defaultBallState
} from "../state";

import { identities } from "@/identity";
import { VEC_ZERO } from "@/math";

import { isTickAction } from "../actions/tick";

export default function tickEmittersReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (!isTickAction(action)) {
    return state;
  }

  for (const emitterId of identities(state.emittersById)) {
    const emitter = state.emittersById[emitterId];
    if (state.tick - emitter.lastEmit >= emitter.rate) {
      const newBallId = uuid();
      state = {
        ...state,
        emittersById: {
          ...state.emittersById,
          [emitterId]: {
            ...state.emittersById[emitterId],
            lastEmit: state.tick
          }
        },
        ballsById: {
          ...state.ballsById,
          [newBallId]: {
            ...defaultBallState,
            id: newBallId,
            position: emitter.position,
            velocity: emitter.velocity
          }
        }
      };
    }
  }

  return state;
}
