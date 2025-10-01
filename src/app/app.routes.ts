import { Routes } from '@angular/router';
import { authGuard } from './core/auth-guard';
import { roleGuard } from './core/role-guard';
import { guestGuard } from './core/guest-guard';

export const routes: Routes = [
  {
    path: 'dashboar',
    canActivate: [authGuard],
    loadComponent: () => import('./presentation/dashboar/dashboar').then((m) => m.Dashboar),

    children: [
      {
        path: 'funds',
        loadComponent: () =>
          import('./presentation/funds/fund-list/fund-list').then((m) => m.FundList),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Admin', 'Cliente'] },
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('./presentation/transactions/transactions-history/transactions-history').then(
            (m) => m.TransactionsHistory
          ),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Admin', 'Consultor', 'Cliente'] },
      },
      {
        path: 'home',
        loadComponent: () => import('./presentation/home/home').then((m) => m.Home),
        canActivate: [authGuard, roleGuard],
        data: { roles: ['Admin', 'Consultor', 'Cliente'] },
      },
       { path: '', redirectTo: 'home', pathMatch: 'full' }
    ],
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./presentation/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./presentation/auth/reset-password/reset-password/reset-password').then(
        (m) => m.ResetPassword
      ),
    canActivate: [guestGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
