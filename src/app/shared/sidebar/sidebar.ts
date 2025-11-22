import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.authService.logoutUser()
    .then(() => {
      this.router.navigate(['/login']);
    });
  }
}
