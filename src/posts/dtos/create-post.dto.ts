import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { User } from 'src/database/entities/user.entity';

export class CreatePostDto {
  @IsString()
  content: string;

  @IsNumber()
  userId: number;
}
