import { AppState } from "@/state";

export const emittersByIdSelector = (state: AppState) =>
  state.services.boing.emittersById;
