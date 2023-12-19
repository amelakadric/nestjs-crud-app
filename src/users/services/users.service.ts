import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto } from '../dtos/filter-user.dto';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(private readonly userRepository: UserRepository) {
    this.logger = new Logger(UsersService.name);
  }

  createUser(createUser: CreateUserDto): Promise<User> {
    return this.userRepository.store(createUser);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOneUser(id: string): Promise<User> {
    return this.userRepository.findById(Number(id));
  }

  async updateUser(updateUser: UpdateUserDto, id: string) {
    const savedUser = await this.userRepository.updateOne(
      Number(id),
      UpdateUserDto,
    );
    this.logger.log('User updated', { savedUser });

    return savedUser;
  }

  async deleteUser(id: string) {
    const user = await this.findOneUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const deletedUser = await this.userRepository.destroy(Number(id));
    this.logger.log('User deleted', { deletedUser });
    return `Deleted user #${id}`;
  }

  filterUsers(filters: FilterUserDto) {
    let filteredUsers = this.findAllUsers();

    for (let key of Object.keys(filters)) {
      const value = filters[key];

      if (value !== undefined) {
        // filteredUsers = filteredUsers.filter((user) => user[key] == value);
      }
    }
    return filteredUsers;
  }
}
