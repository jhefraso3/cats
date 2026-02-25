import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(data: any) {
    const hash = await bcrypt.hash(data.password, 10);
    return this.userModel.create({ ...data, password: hash });
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
}