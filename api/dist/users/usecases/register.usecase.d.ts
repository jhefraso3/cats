import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class RegisterUseCase {
    private readonly usersService;
    constructor(usersService: UsersService);
    executeRegister(createUserdto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/users-schema.schema").Users, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/users-schema.schema").Users & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
