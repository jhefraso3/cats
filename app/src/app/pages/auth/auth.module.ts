import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { LoginModule } from 'src/app/pages/auth/login/login.module';
import { RegisterModule } from 'src/app/pages/auth/register/register.module';
import { UserModule } from 'src/app/pages/auth/user/user.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    LoginModule,
    RegisterModule,
    UserModule
  ]
})
export class AuthModule { }
