import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  commentText: string;

  @IsNumber()
  user: number;

  @IsNumber()
  post: number;
}
