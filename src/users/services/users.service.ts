import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto } from '../dtos/filter-user.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import { find } from 'rxjs';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(private readonly userRepository: UserRepository) {
    this.logger = new Logger(UsersService.name);
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    try {
      return this.userRepository.store(createUser);
    } catch (error) {
      this.logger.log(`UsersService:create: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();
      if (users?.length === 0) {
        throw new Error('No record found.');
      }
      return users;
    } catch (error) {
      this.logger.log(
        `UsersService:findAll : ${JSON.stringify(error.message)}`,
      );
    }
  }

  async findOneUser(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findById(Number(id));
      if (!user) {
        throw new Error('User not found.');
      }
      return user;
    } catch (error) {
      this.logger.log(
        `UsersService:findById: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async updateUser(updateUser: UpdateUserDto, id: string) {
    try {
      await this.findOneUser(id);
      const savedUser = await this.userRepository.updateOne(
        Number(id),
        UpdateUserDto,
      );
      this.logger.log('User updated', { savedUser });

      return savedUser;
    } catch (error) {
      this.logger.log(`UsersService:update: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
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
