import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authService';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ui } from '../../shared/ui.selector';
import * as uiActions from '../../shared/ui.actions';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly store = inject(Store<AppState>);

  public isLoading = toSignal(this.store.select(ui).pipe(map(ui => ui.isLoading)));

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(uiActions.isLoading());

    const { email, password } = this.loginForm.value;

    this.authService
      .loginUser(email, password)
      .then((userCredential) => {
        this.store.dispatch(uiActions.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.authService.getErrorMessage(error.code),
        });
      });
  }
}
