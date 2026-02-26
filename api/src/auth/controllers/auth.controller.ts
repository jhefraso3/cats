import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../dto/login.dto";
import { LoginUseCase } from "../usecases/login.usecase";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  @Post("login")
  async login(@Body() user: LoginDto) {
    return this.loginUseCase.executeLogin(user);
  }
}
