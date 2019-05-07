import { AnyAction } from "redux";

import { BoingServiceState, defaultBoingServiceState } from "../state";

import { isSetSizeAction } from "../actions/set-size";

export default function setSizeReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (!isSetSizeAction(action)) {
    return state;
  }

  const size = action.payload;

  return {
    ...state,
    fieldMax: size
  };
}
