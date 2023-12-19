import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  commentText: string;

  @Transform((date) => {
    return new Date();
  })
  @IsDate()
  date: Date;

  @IsNumber()
  user: number;

  @IsNumber()
  post: number;
}
