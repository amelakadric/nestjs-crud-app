import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @Transform((value) => +value)
  type?: number;
}
