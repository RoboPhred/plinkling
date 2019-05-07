import { AnyAction } from "redux";

export const ACTION_SET_SIZE = "boing/set-size";
export const setSize = (x: number, y: number) => ({
  type: ACTION_SET_SIZE as typeof ACTION_SET_SIZE,
  payload: { x, y }
});
export type SetSizeAction = ReturnType<typeof setSize>;
export function isSetSizeAction(action: AnyAction): action is SetSizeAction {
  return action.type === ACTION_SET_SIZE;
}
