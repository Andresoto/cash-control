import { createFeatureSelector } from "@ngrx/store";
import { IncomingExitState } from "./incoming-exit.reducer";

export const incomingExitSelector = createFeatureSelector<IncomingExitState>('incomingExit');
