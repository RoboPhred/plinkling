import { AppState } from "@/state";

export const ballsByIdSelector = (state: AppState) =>
  state.services.boing.ballsById;
