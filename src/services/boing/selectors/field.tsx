import { AppState } from "@/state";
import { angle, VEC_X } from "@/math";

export const gravitySelector = (state: AppState) =>
  state.services.boing.gravity;

export const gravityDirectionSelector = (state: AppState) =>
  angle(VEC_X, gravitySelector(state));
