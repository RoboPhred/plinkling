import reduceReducers from "reduce-reducers";
import { AnyAction } from "redux";

import { BoingServiceState, defaultBoingServiceState } from "../state";

import { isTickAction } from "../actions/tick";

import tickEmittersReducer from "./tick-emitters";
import tickBallsReducer from "./tick-balls";

const childReducers = reduceReducers(tickEmittersReducer, tickBallsReducer);

export default function reducer(
  state: BoingServiceState = defaultBoingServiceState,
  action: AnyAction
) {
  if (isTickAction(action)) {
    state = {
      ...state,
      tick: state.tick + action.payload.millisElapsed
    };
  }

  return childReducers(state, action);
}
