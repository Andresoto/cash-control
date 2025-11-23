import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../shared/navbar/navbar";
import { Sidebar } from "../shared/sidebar/sidebar";
import { Footer } from "../shared/footer/footer";
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { userSelector } from '../auth/auth.selector';
import { filter, Subscription } from 'rxjs';
import { IncomingExitService } from '../services/incoming-exit-service';
import { setItems } from '../incoming-exit/incoming-exit.actions';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Sidebar, RouterOutlet, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {

  private readonly store = inject(Store<AppState>);
  private readonly incomingExitService = inject(IncomingExitService);

  private userSubscription!: Subscription;
  private itemsSubscription!: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.store.select(userSelector)
    .pipe(
      filter(({ user }) => user !== null)
    )
    .subscribe(({ user }) => {
      console.log(user);
      this.itemsSubscription = this.incomingExitService.initIncomeExitListener(user!.uid)
      .subscribe((items: any) => {
        console.log(items);
        this.store.dispatch(setItems({ items }));
      });
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.itemsSubscription?.unsubscribe();
  }
}
