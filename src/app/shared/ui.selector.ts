import { createFeatureSelector } from "@ngrx/store";
import { LoadingState } from "./ui.reducer";

export const ui = createFeatureSelector<LoadingState>('ui');
