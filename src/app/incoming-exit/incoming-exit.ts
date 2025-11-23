import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomingExitService } from '../services/incoming-exit-service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { LoadingState } from '../shared/ui.reducer';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ui } from '../shared/ui.selector';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-incoming-exit',
  imports: [ReactiveFormsModule],
  templateUrl: './incoming-exit.html',
  styleUrl: './incoming-exit.scss',
})
export class IncomingExit implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly incomingExitService = inject(IncomingExitService);
  private readonly store = inject(Store<LoadingState>);

  public isLoading = toSignal(this.store.select(ui).pipe(map(state => state.isLoading)));

  public form!: FormGroup;
  public type = signal<'income' | 'exit'>('income');


  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(isLoading());

    const data = {
      ...this.form.value,
      type: this.type(),
    };

    this.incomingExitService.saveIncomeExit(data)
    .then(() => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: 'success',
        title: 'Registro guardado',
        text: data.description,
        showConfirmButton: false,
        timer: 1500,
      });
      this.form.reset();
    })
    .catch((error) => {
      this.store.dispatch(stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: 'Hubo un error al guardar el registro. Inténtalo de nuevo.',
      });
    });
  }
}
