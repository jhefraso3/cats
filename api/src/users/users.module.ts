import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './users.service';
import { Users, UsersSchema } from './schemas/users-schema.schema';
import { RegisterUseCase } from './usecases/register.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    RegisterUseCase,
    {
      provide: 'IUsersService',
      useClass: UsersService,
    },
  ],
  exports: ['IUsersService', MongooseModule],
})
export class UsersModule {}