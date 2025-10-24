import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { NotAuthenticatedComponent } from './core/not-authenticated/not-authenticated.component';
import { skip } from 'rxjs';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'store',
    loadChildren: () =>
      import('./store/store.module').then((mod) => mod.StoreModule),
    data: { breadcrumb: 'Store' },
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./basket/basket.module').then((mod) => mod.BasketModule),
    data: { breadcrumb: 'Basket' },
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((mod) => mod.AccountModule),
    data: { breadcrumb: { skip: true } },
  },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'not-authenticated', component: NotAuthenticatedComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
