import { Routes } from '@angular/router';
import { RootPageBuilderComponent } from './features/page-builder/containers/root-page-builder/root-page-builder.component';

export const routes: Routes = [
  {
    path: 'page-builder',
    loadComponent: () => RootPageBuilderComponent,
  },
];
