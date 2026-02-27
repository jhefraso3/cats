import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [MaterialModule],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
