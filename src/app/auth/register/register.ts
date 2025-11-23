import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authService';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { ui } from '../../shared/ui.selector';
import * as uiActions from '../../shared/ui.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly store = inject(Store<AppState>);

  public isLoading = toSignal(this.store.select(ui).pipe(map(ui => ui.isLoading)));
  public registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public createUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(uiActions.isLoading());

    const { username, email, password } = this.registerForm.value;

    this.authService
      .createUser(username, email, password)
      .then((userCredential) => {
        this.store.dispatch(uiActions.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: this.authService.getErrorMessage(error.code),
        });
      });
  }
}
