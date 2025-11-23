import { ActionReducerMap } from "@ngrx/store";
import * as ui from "./shared/ui.reducer";
import * as auth from "./auth/auth.reducer";
import * as incomingExit from "./incoming-exit/incoming-exit.reducer";


export interface AppState {
  ui: ui.LoadingState;
  user: auth.AuthState;
  incomingExit: incomingExit.IncomingExitState
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  incomingExit: incomingExit.incomingExitReducer
};
