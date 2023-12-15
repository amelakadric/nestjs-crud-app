import { ParseIntPipe } from '@nestjs/common';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsInt()
  type: number;
}
