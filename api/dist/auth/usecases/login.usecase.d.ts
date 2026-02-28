import { LoginInput } from "../type/login-input.type";
import { JwtService } from "@nestjs/jwt";
import type { IUsersService } from "../interfaces/users-services.interface";
import { LoginResponseDto } from "../dto/login-response.dto";
export declare class LoginUseCase {
    private readonly usersServiceInterface;
    private jwtService;
    private readonly logger;
    constructor(usersServiceInterface: IUsersService, jwtService: JwtService);
    executeLogin(loginInput: LoginInput): Promise<LoginResponseDto>;
}
