import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../users/users.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("../users/users.schema").User & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        token: string;
    }>;
}
