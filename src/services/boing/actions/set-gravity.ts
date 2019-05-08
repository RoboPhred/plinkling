import { AnyAction } from "redux";

export const ACTION_SET_GRAVITY_DIRECTION = "boing/set-gravity-direction";
export const setGravityDirection = (angle: number) => ({
  type: ACTION_SET_GRAVITY_DIRECTION as typeof ACTION_SET_GRAVITY_DIRECTION,
  payload: { angle }
});
export type SetGravityDirectionAction = ReturnType<typeof setGravityDirection>;
export function isSetGravityDirectionAction(
  action: AnyAction
): action is SetGravityDirectionAction {
  return action.type === ACTION_SET_GRAVITY_DIRECTION;
}

export const ACTION_SET_GRAVITY_POWER = "boing/set-gravity-power";
export const setGravityStrength = (strength: number) => ({
  type: ACTION_SET_GRAVITY_POWER as typeof ACTION_SET_GRAVITY_POWER,
  payload: { strength }
});
export type SetGravityStrengthAction = ReturnType<typeof setGravityStrength>;
export function isSetGravityStrengthAction(
  action: AnyAction
): action is SetGravityStrengthAction {
  return action.type === ACTION_SET_GRAVITY_POWER;
}
