import {
  BoingServiceState,
  defaultBoingServiceState
} from "@/services/boing/state";

export interface AppState {
  services: {
    boing: BoingServiceState;
  };
}

export const defaultAppState: Readonly<AppState> = Object.freeze({
  services: {
    boing: defaultBoingServiceState
  }
});
