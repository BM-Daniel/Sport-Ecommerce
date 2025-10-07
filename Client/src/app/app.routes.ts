import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { NotAuthenticatedComponent } from './core/not-authenticated/not-authenticated.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'store',
    loadChildren: () =>
      import('./store/store.module').then((mod) => mod.StoreModule),
  },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'not-authenticated', component: NotAuthenticatedComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
