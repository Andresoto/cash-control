import { Auth } from "@angular/fire/auth";
import { createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";


export const userSelector = createFeatureSelector<AuthState>('user');
