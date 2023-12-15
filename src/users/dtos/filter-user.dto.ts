import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class FilterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  type: number;
}
