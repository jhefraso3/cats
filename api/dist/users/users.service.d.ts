import { Model } from "mongoose";
import { IUsersService } from "src/auth/interfaces/users-services.interface";
import { Users } from "./schemas/users-schema.schema";
import { CreateResponseDto } from "./dto/create-response.dto";
export declare class UsersService implements IUsersService {
    private userModel;
    private readonly logger;
    constructor(userModel: Model<Users>);
    register(user: Partial<Users>): Promise<CreateResponseDto>;
    findByUsername(username: string): Promise<Users | null>;
}
