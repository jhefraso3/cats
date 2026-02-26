import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { USERS_MESSAGES } from '../constants/users-messages.constants';

@Injectable()
export class RegisterUseCase {

  constructor(private readonly usersService: UsersService) {}

  async executeRegister(createUserdto: CreateUserDto) {
    const exists = await this.usersService.findByUsername(createUserdto.username);

    if (exists) {
      throw new ConflictException(USERS_MESSAGES.ERROR.FIND_USERNAME);
    }

    const hashedPassword = await bcrypt.hash(createUserdto.password, 10);

    return this.usersService.register({
      ...createUserdto,
      password: hashedPassword,
    });
  }
}