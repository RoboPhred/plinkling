import { AnyAction } from "redux";
import { BoingServiceState, defaultBoingServiceState } from "../state";
import { isResetAction } from "../actions/reset";

export default function resetReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (isResetAction(action)) {
    return {
      ...state,
      tick: 0,
      gravity: defaultBoingServiceState.gravity,
      emittersById: defaultBoingServiceState.emittersById,
      ballsById: {},
      bouncersById: {}
    };
  }
  return state;
}
