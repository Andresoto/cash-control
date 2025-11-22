import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authService';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: 'Cargando...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { email, password } = this.loginForm.value;

    this.authService
      .loginUser(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.authService.getErrorMessage(error.code),
        });
      });
  }
}
