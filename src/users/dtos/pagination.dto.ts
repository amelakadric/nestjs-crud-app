import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Transform((page) => +page)
  page?: number;

  @IsOptional()
  @Transform((pageSize) => +pageSize)
  pageSize?: number;
}
