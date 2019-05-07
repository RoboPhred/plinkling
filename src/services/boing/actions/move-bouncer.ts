import { AnyAction } from "redux";

import { Vector2 } from "@/math";

export const ACTION_MOVE_BOUNCER = "boing/move-bouncer";
export const moveBouncer = (id: string, p1: Vector2, p2: Vector2) => ({
  type: ACTION_MOVE_BOUNCER as typeof ACTION_MOVE_BOUNCER,
  payload: { id, p1, p2 }
});
export type MoveBouncerAction = ReturnType<typeof moveBouncer>;
export function isMoveBouncerAction(
  action: AnyAction
): action is MoveBouncerAction {
  return action.type === ACTION_MOVE_BOUNCER;
}
