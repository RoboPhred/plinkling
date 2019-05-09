import { AnyAction } from "redux";
import { set } from "lodash/fp";

import {
  BoingServiceState,
  defaultBoingServiceState,
  EmitterState
} from "../state";
import { isSetEmitterDirectionAction } from "../actions/set-emitter-velocity";
import { vector, magnitude } from "@/math";

export default function setEmitterVelocityReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (isSetEmitterDirectionAction(action)) {
    const { id, angle } = action.payload;
    const emitter = state.emittersById[id];
    if (!emitter) {
      return state;
    }
    const newEmitter: EmitterState = {
      ...emitter,
      velocity: vector(angle, magnitude(emitter.velocity))
    };
    return set(["emittersById", id], newEmitter, state);
  }

  return state;
}
