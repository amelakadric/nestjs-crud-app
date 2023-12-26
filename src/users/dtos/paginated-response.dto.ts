import { Transform } from 'class-transformer';
import { IsOptional, IsPositive, IsNumber } from 'class-validator';

export class PaginatedResponseDto<T> {
  _meta: MetaDataDto;
  list: Array<T>;
}

export class MetaDataDto {
  @Transform((value) => +value)
  @IsOptional()
  page: number;

  @Transform((value) => +value)
  @IsOptional()
  perPage: number;

  @IsOptional()
  @IsNumber()
  total: number;
}
