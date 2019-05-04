import { AnyAction } from "redux";

import { AppState } from "@/state";

import { ACTION_TICK } from "@/services/boing/actions/tick";

export const actionsBlacklist: string[] = [ACTION_TICK];

export function actionSanitizer(action: AnyAction): AnyAction {
  return action;
}

export function stateSanitizer(state: AppState): any {
  return state;
}
