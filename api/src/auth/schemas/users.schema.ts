import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Users extends Document {
  @Prop() 
  id: string;
  
  @Prop() 
  username: string;

  @Prop()
  password: string;
  
  @Prop() 
  firstName: string;

  @Prop() 
  lastName: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);