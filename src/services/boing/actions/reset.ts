import { AnyAction } from "redux";

export const ACTION_RESET = "boing/reset";
export const reset = () => ({
  type: ACTION_RESET as typeof ACTION_RESET
});
export type ResetAction = ReturnType<typeof reset>;
export function isResetAction(action: AnyAction): action is ResetAction {
  return action.type === ACTION_RESET;
}
