import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  navigationRoutes,
  sideNavigationPath,
} from './pages/components/navigation/navigation-routing';
import { AuthGuard } from './core/guards/auth.guard';
import { NavigationBarComponent } from './pages/components/navigation/components/navigation-bar/navigation-bar.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: sideNavigationPath,
    component: NavigationBarComponent,
    children: navigationRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
