import { Users } from "../schemas/users.schema";
export interface IUsersService {
    findByUsername(username: string): Promise<Users | null>;
}
