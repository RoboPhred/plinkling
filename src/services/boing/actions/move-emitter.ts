import { AnyAction } from "redux";

export const ACTION_MOVE_EMITTER = "boing/move-emitter";
export const moveEmitter = (id: string, x: number, y: number) => ({
  type: ACTION_MOVE_EMITTER as typeof ACTION_MOVE_EMITTER,
  payload: { id, x, y }
});
export type MoveEmitterAction = ReturnType<typeof moveEmitter>;
export function isMoveEmitterAction(
  action: AnyAction
): action is MoveEmitterAction {
  return action.type === ACTION_MOVE_EMITTER;
}
