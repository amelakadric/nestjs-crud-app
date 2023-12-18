import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { User } from '../../database/entity/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto } from '../dtos/filter-user.dto';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.logger = new Logger(UsersService.name);
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    if (
      await this.userRepository.findOne({ where: { email: createUser.email } })
    ) {
      throw new BadRequestException('User with that email already exists');
    }
    const newUser = this.userRepository.create(createUser);

    const savedUser = await this.userRepository.save(newUser);
    this.logger.log('User created', { savedUser });
    return savedUser;
  }

  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: Number(id) },
    });
    this.logger.log({ user });
    return user;
  }

  async updateUser(updateUser: UpdateUserDto, id: string) {
    const user = await this.userRepository.preload({
      id: Number(id),
      ...updateUser,
    });

    if (!user) {
      this.logger.error(`User #${id} not found`, {
        id: id,
        data: updateUser,
      });
      throw new NotFoundException(`User #${id} not found`);
    }

    const savedUser = await this.userRepository.save(user);
    this.logger.log('User updated', { savedUser });
    return savedUser;
  }

  async deleteUser(id: string) {
    const user = await this.findOneUser(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const deletedUser = await this.userRepository.remove(user);
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
