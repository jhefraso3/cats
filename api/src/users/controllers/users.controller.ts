import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { RegisterUseCase } from '../usecases/register.usecase';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly registerUserUseCase: RegisterUseCase) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.registerUserUseCase.executeRegister(createUserDto);
  }
}