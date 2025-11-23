import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IncomingExitState } from "./incoming-exit.reducer";

const _incomingExitSelector = createFeatureSelector<IncomingExitState>('incomingExit');

export const incomingExitSelector = createSelector(
  _incomingExitSelector,
  ({ items } ) => items
)
