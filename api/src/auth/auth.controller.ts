import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('login')
  login(@Body() body) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  register(@Body() body) {
    return this.usersService.register(body);
  }
}