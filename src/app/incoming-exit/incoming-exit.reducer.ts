import { createReducer, on } from "@ngrx/store";
import { IncomeExit } from "../models/income-exit";
import { setItems, unSetItems } from "./incoming-exit.actions";

export interface IncomingExitState {
  items: IncomeExit[];
}

export const initialState: IncomingExitState = {
  items: [],
};

export const incomingExitReducer = createReducer(
  initialState,
  on( setItems, (state, { items }) => ({ ...state, items: [...items] }) ),
  on( unSetItems, (state) => ({ ...state, items: [] }) )
);
