import { AppState } from "@/state";

export const bouncersByIdSelector = (state: AppState) =>
  state.services.boing.bouncersById;
