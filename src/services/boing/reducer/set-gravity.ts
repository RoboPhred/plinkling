import { AnyAction } from "redux";
import { vector, magnitude, angle, VEC_X } from "@/math";

import { BoingServiceState, defaultBoingServiceState } from "../state";
import {
  isSetGravityDirectionAction,
  isSetGravityStrengthAction
} from "../actions/set-gravity";

export default function setGravityReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (isSetGravityDirectionAction(action)) {
    const { angle } = action.payload;
    return {
      ...state,
      gravity: vector(angle, magnitude(state.gravity))
    };
  }

  if (isSetGravityStrengthAction(action)) {
    const { strength } = action.payload;
    return {
      ...state,
      gravity: vector(angle(state.gravity, VEC_X), strength)
    };
  }

  return state;
}
