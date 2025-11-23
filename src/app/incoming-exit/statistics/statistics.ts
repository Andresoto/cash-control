import { Component, computed, inject } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { incomingExitSelector } from '../incoming-exit.selector';
import { map } from 'rxjs';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-statistics',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics {

  private readonly store = inject(Store<AppState>);
  public incomingExit = toSignal(this.store.select(incomingExitSelector), { initialValue: [] });

  public statistics = computed(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    let incomeCount = 0;
    let expenseCount = 0;

    for (const item of this.incomingExit()) {
      if (item.type === 'income') {
        totalIncome += item.amount;
        incomeCount++;
      } else {
        totalExpense += item.amount;
        expenseCount++;
      }
    }

    return {
      totalIncome,
      totalExpense,
      incomeCount,
      expenseCount
    };
  })


}
