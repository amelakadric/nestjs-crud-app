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

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(private readonly userRepository: UserRepository) {
    this.logger = new Logger(UsersService.name);
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    return this.userRepository.store(createUser);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOneUser(id: string): Promise<User> {
    return this.userRepository.findById(Number(id));
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
