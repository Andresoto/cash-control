import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { toSignal } from '@angular/core/rxjs-interop';
import { incomingExitSelector } from '../incoming-exit.selector';
import { map } from 'rxjs';
import { CurrencyPipe, NgClass } from '@angular/common';
import { IncomingExitService } from '../../services/incoming-exit-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  private readonly store = inject(Store<AppState>);
  private readonly incomingExitService = inject(IncomingExitService);

  public incomingExit = toSignal(this.store.select(incomingExitSelector), { initialValue: [] });
  public incomingExitOrdered = computed(() => {
    return this.incomingExit().slice().sort( (a, b) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    } );
  });

  deleteItem(uid: string): void {
    this.incomingExitService.deleteIncomeExit(uid)
    .then(() => {
      Swal.fire('Eliminado', 'El registro ha sido eliminado', 'success');
    })
    .catch((error) => {
      Swal.fire('Error', 'No se pudo eliminar el registro', 'error');
      console.error(error);
    });
  }

}
