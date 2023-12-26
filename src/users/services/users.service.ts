import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto } from '../dtos/filter-user.dto';
import { UserRepository } from '../../database/repositories/user.repository';
import { Post } from '../../database/entities/post.entity';
import { PaginationDto } from '../dtos/pagination.dto';
import {
  MetaDataDto,
  PaginatedResponseDto,
} from '../dtos/paginated-response.dto';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(private readonly userRepository: UserRepository) {
    this.logger = new Logger(UsersService.name);
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    return this.userRepository.store(createUser);
  }

  async findAllUsers(query: MetaDataDto): Promise<PaginatedResponseDto<User>> {
    query.page = query.page ? query.page : 1;
    query.perPage = query.perPage ? query.perPage : 10;

    const result = await this.userRepository.findAll(query.page, query.perPage);

    const ret = new PaginatedResponseDto<User>();
    ret._meta = query;
    ret.list = result[0];
    ret._meta.total = result[1];

    return ret;
  }

  async findOneUser(id: string): Promise<User> {
    return this.userRepository.findById(Number(id));
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async updateUser(updateUser: UpdateUserDto, id: string): Promise<User> {
    const savedUser = await this.userRepository.updateOne(
      Number(id),
      UpdateUserDto,
    );
    this.logger.log('User updated', { savedUser });

    return savedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userRepository.destroy(Number(id));
    this.logger.log('User deleted', { deletedUser });
    return `Deleted user #${id}`;
  }
}
