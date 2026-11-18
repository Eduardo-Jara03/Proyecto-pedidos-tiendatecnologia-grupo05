
import { Routes } from '@angular/router';
import { RegistroProducto } from './pages/registro-producto/registro-producto';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'producto',
    pathMatch: 'full'
  },
  {
    path: 'producto',
    component: RegistroProducto
  },
  {
    path: '**',
    redirectTo: 'producto'
  }
];
