import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatsRoutingModule } from './cats-routing.module';
import { CatsViewComponent } from './components/cats-view/cats-view.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CatsTableComponent } from './components/cats-table/cats-table.component';


@NgModule({
  declarations: [
    CatsViewComponent,
    CatsTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CatsRoutingModule
  ]
})
export class CatsModule { }
