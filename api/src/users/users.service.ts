import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { IUsersService } from "src/auth/interfaces/users-services.interface";
import { Users } from "./schemas/users-schema.schema";
import { USERS_MESSAGES } from "./constants/users-messages.constants";
import { CreateResponseDto } from "./dto/create-response.dto";

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async register(user: Partial<Users>): Promise<CreateResponseDto> {
    try {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }

      const createdUser = await this.userModel.create(user);

      return {
        id: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        username: createdUser.username,
      };
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        USERS_MESSAGES.ERROR.CREATE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
