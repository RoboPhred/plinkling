import { AnyAction } from "redux";

import { Vector2 } from "@/math";

export const ACTION_CREATE_BOUNCER = "boing/create-bouncer";
export const createBouncer = (p1: Vector2, p2: Vector2) => ({
  type: ACTION_CREATE_BOUNCER as typeof ACTION_CREATE_BOUNCER,
  payload: { p1, p2 }
});
export type CreateBouncerAction = ReturnType<typeof createBouncer>;
export function isCreateBouncerAction(
  action: AnyAction
): action is CreateBouncerAction {
  return action.type === ACTION_CREATE_BOUNCER;
}
