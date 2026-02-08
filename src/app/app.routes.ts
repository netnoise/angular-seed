import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'tasks',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'calendar',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'team',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
      },
    ],
  },
];
