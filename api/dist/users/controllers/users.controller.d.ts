import { CreateUserDto } from '../dto/create-user.dto';
import { RegisterUseCase } from '../usecases/register.usecase';
export declare class UsersController {
    private readonly registerUserUseCase;
    constructor(registerUserUseCase: RegisterUseCase);
    register(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/users-schema.schema").Users, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/users-schema.schema").Users & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
