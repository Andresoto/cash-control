import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/authService';
import Swal from 'sweetalert2';

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

    Swal.fire({
      title: 'Cargando...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { username, email, password } = this.registerForm.value;

    this.authService
      .createUser(username, email, password)
      .then((userCredential) => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: this.authService.getErrorMessage(error.code),
        });
      });
  }
}
