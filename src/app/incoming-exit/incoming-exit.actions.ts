import { createAction, props } from '@ngrx/store';
import { IncomeExit } from '../models/income-exit';

export const unSetItems = createAction('[IncomingExit] Unset Items');
export const setItems = createAction('[IncomingExit] Set Items', props<{ items: IncomeExit[] }>());
