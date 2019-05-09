import { AnyAction } from "redux";

export const ACTION_SET_EMITTER_DIRECTION = "boing/set-emitter-direction";
export const setEmitterDirection = (id: string, angle: number) => ({
  type: ACTION_SET_EMITTER_DIRECTION as typeof ACTION_SET_EMITTER_DIRECTION,
  payload: { id, angle }
});
export type SetEmitterDirectionAction = ReturnType<typeof setEmitterDirection>;
export function isSetEmitterDirectionAction(
  action: AnyAction
): action is SetEmitterDirectionAction {
  return action.type === ACTION_SET_EMITTER_DIRECTION;
}
