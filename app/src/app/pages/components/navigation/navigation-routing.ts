import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

export const sideNavigationPath = '';

export const navigationRoutes: Routes = [
  {
    path: 'cats',
    loadChildren: () =>
      import('../../cats/cats.module').then(
        (m) => m.CatsModule,
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../../user/user.module').then(
        (m) => m.UserModule,
      ),
      canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@Injectable({ providedIn: 'root' })
export class NavigationRoutingService {
  constructor() {}
}
