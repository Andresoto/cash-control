import { createFeatureSelector } from "@ngrx/store";
import { State } from "./ui.reducer";

export const ui = createFeatureSelector<State>('ui');
