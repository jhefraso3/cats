import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SnackbarModule } from 'src/app/core/components/snackbar/snackbar.module';
import { LoginComponent } from './components/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, MaterialModule, SnackbarModule],
})
export class LoginModule {}
