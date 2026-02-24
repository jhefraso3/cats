import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatsViewComponent } from './components/cats-view/cats-view.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CatsTableComponent } from './components/cats-table/cats-table.component';

const routes: Routes = [
  {
      path: 'cats-view',
      component: CatsViewComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'cats-table',
      component: CatsTableComponent,
      canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsRoutingModule { }
