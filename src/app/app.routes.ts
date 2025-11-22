import { Routes } from '@angular/router';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register').then(m => m.Register)
  },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.dashboardRoutes),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
