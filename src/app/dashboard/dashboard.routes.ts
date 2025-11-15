import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then((m) => m.Dashboard),
    children: [
      {
        path: '',
        loadComponent: () => import('../incoming-exit/statistics/statistics').then((m) => m.Statistics),
      },
      {
        path: 'incoming-exit',
        loadComponent: () => import('../incoming-exit/incoming-exit').then((m) => m.IncomingExit),
      },
      {
        path: 'details',
        loadComponent: () => import('../incoming-exit/details/details').then((m) => m.Details),
      },
    ],
  },
];
