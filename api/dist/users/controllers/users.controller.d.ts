import { CreateUserDto } from '../dto/create-user.dto';
import { RegisterUseCase } from '../usecases/register.usecase';
export declare class UsersController {
    private readonly registerUserUseCase;
    constructor(registerUserUseCase: RegisterUseCase);
    register(createUserDto: CreateUserDto): Promise<import("../dto/create-response.dto").CreateResponseDto>;
}
