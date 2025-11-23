import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { toSignal } from '@angular/core/rxjs-interop';
import { userNameSelector } from '../../auth/auth.selector';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  private readonly store = inject(Store<AppState>);

  public userName = toSignal(this.store.select(userNameSelector));
}
