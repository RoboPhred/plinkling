import { AnyAction } from "redux";
import { set } from "lodash/fp";

import {
  BoingServiceState,
  defaultBoingServiceState,
  BouncerState
} from "../state";

import { isMoveBouncerAction } from "../actions/move-bouncer";

export default function moveBouncerReducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
): BoingServiceState {
  if (!isMoveBouncerAction(action)) {
    return state;
  }

  const { id, p1, p2 } = action.payload;

  const bouncer = state.bouncersById[id];
  if (!bouncer) {
    return state;
  }

  const newBouncer: BouncerState = {
    ...bouncer,
    p1,
    p2
  };

  return set(["bouncersById", id], newBouncer, state);
}
