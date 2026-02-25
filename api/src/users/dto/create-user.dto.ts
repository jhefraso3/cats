import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ example: 'Jhenifer Franco' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'jhenifer@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}