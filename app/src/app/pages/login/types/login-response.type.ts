import { User } from "../../user/type/user.type";

export type LoginResponse = {
    token: string;
    user: User;
}