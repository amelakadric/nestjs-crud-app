import { ParseIntPipe } from '@nestjs/common';
import { IsEmail, IsEnum, IsInt, IsString } from 'class-validator';
import { Role } from 'src/utils/roles.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
