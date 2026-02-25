import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private auth;
    private users;
    constructor(auth: AuthService, users: UsersService);
    login(body: any): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../users/users.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../users/users.schema").User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        token: string;
    }>;
    register(body: any): Promise<import("mongoose").Document<unknown, {}, import("../users/users.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../users/users.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
