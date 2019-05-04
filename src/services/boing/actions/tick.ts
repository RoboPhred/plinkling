import { AnyAction } from "redux";

export const ACTION_TICK = "boing/tick";
export const tick = (millis: number) => ({
  type: ACTION_TICK as typeof ACTION_TICK,
  payload: { millisElapsed: millis }
});
export type TickAction = ReturnType<typeof tick>;
export function isTickAction(action: AnyAction): action is TickAction {
  return action.type === ACTION_TICK;
}
