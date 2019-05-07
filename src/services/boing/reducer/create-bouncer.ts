import { AnyAction } from "redux";
import uuid from "uuid/v4";

import {
  defaultBoingServiceState,
  BoingServiceState,
  defaultBouncerState
} from "../state";

import { isCreateBouncerAction } from "../actions/create-bouncer";

export default function createBouncerReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (!isCreateBouncerAction(action)) {
    return state;
  }

  const { p1, p2 } = action.payload;
  const id = uuid();

  return {
    ...state,
    bouncersById: {
      ...state.bouncersById,
      [id]: {
        ...defaultBouncerState,
        id,
        p1,
        p2
      }
    }
  };
}
