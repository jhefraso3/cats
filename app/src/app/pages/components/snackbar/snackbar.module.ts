import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SnackbarComponent } from './components/snackbar.component';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SnackbarComponent
  ]
})
export class SnackbarModule { }
