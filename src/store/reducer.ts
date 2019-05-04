import { combineReducers, AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";

import boingServiceReducer from "@/services/boing/reducer";

const servicesReducer = combineReducers({
  boing: boingServiceReducer
});

export default function reducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  return {
    services: servicesReducer(state.services, action)
  };
}
