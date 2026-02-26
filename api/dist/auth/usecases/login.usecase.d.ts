import { LoginInput } from "../type/login-input.type";
import { JwtService } from "@nestjs/jwt";
import type { IUsersService } from "../interfaces/users-services.interface";
export declare class LoginUseCase {
    private readonly usersServiceInterface;
    private jwtService;
    constructor(usersServiceInterface: IUsersService, jwtService: JwtService);
    executeLogin(loginInput: LoginInput): Promise<{
        user: import("../schemas/users.schema").Users;
        token: string;
    }>;
}
