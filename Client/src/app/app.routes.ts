import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'store',
    loadChildren: () =>
      import('./store/store.module').then((mod) => mod.StoreModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
