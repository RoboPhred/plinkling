import { AnyAction } from "redux";
import { set } from "lodash/fp";

import {
  BoingServiceState,
  defaultBoingServiceState,
  EmitterState
} from "../state";
import { isSetEmitterRateAction } from "../actions/set-emitter-rate";

export default function setEmitterRateReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (!isSetEmitterRateAction(action)) {
    return state;
  }

  const { id, rate } = action.payload;

  const emitter = state.emittersById[id];
  if (!emitter) {
    return state;
  }

  const newEmitter: EmitterState = {
    ...emitter,
    rate
  };

  return set(["emittersById", id], newEmitter, state);
}
