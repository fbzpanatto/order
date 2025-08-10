import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home').then(m => m.Home) },
  { path: 'import-data', loadComponent: () => import('./components/import-data/import-data').then(m => m.ImportData) },
  { path: 'order', loadComponent: () => import('./components/order/order').then(m => m.Order) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
