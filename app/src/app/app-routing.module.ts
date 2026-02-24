import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './core/components/navigation/components/navigation/navigation.component';
import {
  navigationRoutes,
  sideNavigationPath,
} from './core/components/navigation/navigation-routing';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/auth/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: sideNavigationPath,
    component: NavigationComponent,
    children: navigationRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
