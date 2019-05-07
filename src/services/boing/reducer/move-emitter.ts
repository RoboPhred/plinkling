import { AnyAction } from "redux";
import { set } from "lodash/fp";

import {
  BoingServiceState,
  defaultBoingServiceState,
  EmitterState
} from "../state";

import { isMoveEmitterAction } from "../actions/move-emitter";

export default function moveEmitterReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (!isMoveEmitterAction(action)) {
    return state;
  }

  const { id, x, y } = action.payload;

  const emitter = state.emittersById[id];
  if (!emitter) {
    return state;
  }

  const newEmitter: EmitterState = {
    ...emitter,
    position: { x, y }
  };

  return set(["emittersById", id], newEmitter, state);
}
