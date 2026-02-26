import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginInput } from "../type/login-input.type";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "../type/jwt-payload.type";
import { JwtService } from "@nestjs/jwt";
import type { IUsersService } from "../interfaces/users-services.interface";
import { AUTH_MESSAGES } from "../constants/auth-messages.constants";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject("IUsersServicePort")
    private readonly usersServiceInterface: IUsersService,
    private jwtService: JwtService,
  ) {}

  async executeLogin(loginInput: LoginInput) {
    const user = await this.usersServiceInterface.findByUsername(
      loginInput.username,
    );
    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(loginInput.password, user.password);
    if (!valid) throw new UnauthorizedException(AUTH_MESSAGES.ERROR.POST);

    const payload: JwtPayload = {
      id: user.id,
    };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
