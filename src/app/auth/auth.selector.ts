import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";


const _userSelector = createFeatureSelector<AuthState>('user');

export const userSelector = createSelector(
  _userSelector,
  ({user}) => user
);

export const userNameSelector = createSelector(
  _userSelector,
  ({user}) => user?.username
);
