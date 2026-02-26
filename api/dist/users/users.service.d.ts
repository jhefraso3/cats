import { Model } from "mongoose";
import { IUsersService } from "src/auth/interfaces/users-services.interface";
import { Users } from "./schemas/users-schema.schema";
export declare class UsersService implements IUsersService {
    private userModel;
    private readonly logger;
    constructor(userModel: Model<Users>);
    register(user: Partial<Users>): Promise<import("mongoose").Document<unknown, {}, Users, {}, import("mongoose").DefaultSchemaOptions> & Users & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByUsername(username: string): Promise<Users | null>;
}
