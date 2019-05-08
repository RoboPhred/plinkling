import reduceReducers from "reduce-reducers";
import { AnyAction } from "redux";

import { BoingServiceState, defaultBoingServiceState } from "../state";

import { isTickAction } from "../actions/tick";

import tickEmittersReducer from "./tick-emitters";
import tickBallsReducer from "./tick-balls";
import createBouncerReducer from "./create-bouncer";
import moveEmitterReducer from "./move-emitter";
import moveBouncerReducer from "./move-bouncer";
import setEmitterRateReducer from "./set-emitter-rate";
import setSize from "./set-size";

const childReducers = reduceReducers(
  tickEmittersReducer,
  tickBallsReducer,
  createBouncerReducer,
  moveEmitterReducer,
  moveBouncerReducer,
  setEmitterRateReducer,
  setSize
);

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
