import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { LoginInput } from "../type/login-input.type";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "../type/jwt-payload.type";
import { JwtService } from "@nestjs/jwt";
import type { IUsersService } from "../interfaces/users-services.interface";
import { AUTH_MESSAGES } from "../constants/auth-messages.constants";
import { LoginResponseDto } from "../dto/login-response.dto";

@Injectable()
export class LoginUseCase {
  private readonly logger = new Logger(LoginUseCase.name);

  constructor(
    @Inject("IUsersServicePort")
    private readonly usersServiceInterface: IUsersService,
    private jwtService: JwtService,
  ) {}

  async executeLogin(loginInput: LoginInput): Promise<LoginResponseDto> {
    try {
      const user = await this.usersServiceInterface.findByUsername(
        loginInput.username,
      );

      if (!user) {
        throw new HttpException(
          AUTH_MESSAGES.ERROR.USER_NOT_FOUND,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const valid = await bcrypt.compare(loginInput.password, user.password);

      if (!valid) {
        throw new HttpException(
          AUTH_MESSAGES.ERROR.WRONG_USER_PASSWORD,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload: JwtPayload = {
        id: user.id,
      };

      return {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        },
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(AUTH_MESSAGES.ERROR.EXECUTION_ERROR, error);

      throw new HttpException(
        AUTH_MESSAGES.ERROR.INTERNAL_SERVER,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
