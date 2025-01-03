import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { RootLoginComponent } from './features/login/containers/root-login/root-login.component';
import { RootPageBuilderComponent } from './features/page-builder/containers/root-page-builder/root-page-builder.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () => RootLoginComponent,
  },
  {
    path: 'page-builder',
    loadComponent: () => RootPageBuilderComponent,
    canActivate: [authGuardFn],
  },
];
