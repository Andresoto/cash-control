import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/authService';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { userNameSelector } from '../../auth/auth.selector';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly store = inject(Store<AppState>);

  public userName = toSignal(this.store.select(userNameSelector));

  logout(): void {
    this.authService.logoutUser()
    .then(() => {
      this.router.navigate(['/login']);
    });
  }
}
