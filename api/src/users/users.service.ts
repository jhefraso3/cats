import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { IUsersService } from "src/auth/interfaces/users-services.interface";
import { Users } from "./schemas/users-schema.schema";
import { USERS_MESSAGES } from "./constants/users-messages.constants";

@Injectable()
export class UsersService implements IUsersService {

  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async register(user: Partial<Users>) {
    return this.userModel.create(user);
  }

  async findByUsername(username: string): Promise<Users | null> {
    try {
      return await this.userModel.findOne({ username });
    } catch (error) {
      this.logger.error(error);

      if (error instanceof HttpException) throw error;

      throw new HttpException(
        USERS_MESSAGES.ERROR.GET_USER_INFO,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
