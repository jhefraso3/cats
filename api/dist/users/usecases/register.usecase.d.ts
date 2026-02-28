import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class RegisterUseCase {
    private readonly usersService;
    constructor(usersService: UsersService);
    executeRegister(createUserdto: CreateUserDto): Promise<import("../dto/create-response.dto").CreateResponseDto>;
}
