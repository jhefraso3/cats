import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AlertComponent } from './alert.component';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, MaterialModule],
  exports: [AlertComponent],
})
export class AlertModule {}
