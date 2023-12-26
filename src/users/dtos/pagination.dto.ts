import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Transform((page) => +page)
  @IsPositive()
  page?: number;

  @IsOptional()
  @Transform((pageSize) => +pageSize)
  @IsPositive()
  pageSize?: number;
}
