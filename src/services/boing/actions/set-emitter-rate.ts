import { AnyAction } from "redux";

export const ACTION_SET_EMITTER_RATE = "boing/set-emitter-rate";
export const setEmitterRate = (id: string, rate: number) => ({
  type: ACTION_SET_EMITTER_RATE as typeof ACTION_SET_EMITTER_RATE,
  payload: { id, rate }
});
export type SetEmitterRateAction = ReturnType<typeof setEmitterRate>;
export function isSetEmitterRateAction(
  action: AnyAction
): action is SetEmitterRateAction {
  return action.type === ACTION_SET_EMITTER_RATE;
}
