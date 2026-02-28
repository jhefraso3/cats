import { LoginDto } from "../dto/login.dto";
import { LoginUseCase } from "../usecases/login.usecase";
export declare class AuthController {
    private loginUseCase;
    constructor(loginUseCase: LoginUseCase);
    login(user: LoginDto): Promise<import("../dto/login-response.dto").LoginResponseDto>;
}
