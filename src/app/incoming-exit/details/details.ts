import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { toSignal } from '@angular/core/rxjs-interop';
import { incomingExitSelector } from '../incoming-exit.selector';
import { map } from 'rxjs';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  private readonly store = inject(Store<AppState>);

  incomingExit = toSignal(this.store.select(incomingExitSelector).pipe(map(({items}) => items)));

  deleteItem(uid: string): void {
    console.log('Eliminar item con uid:', uid);
  }

}
