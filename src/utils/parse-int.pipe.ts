import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { FilterUserDto } from 'src/users/dtos/filter-user.dto';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: FilterUserDto, metadata: ArgumentMetadata): FilterUserDto {
    if (!value.type) {
      return value;
    }
    const val = Number(value.type);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    value.type = val;
    return value;
  }
}
