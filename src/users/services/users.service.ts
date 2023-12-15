import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FilterUserDto } from '../dtos/filter-user.dto';
import { filter } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly allUsers: User[] = [];
  logger: Logger;

  constructor() {
    this.logger = new Logger(UsersService.name);
  }

  createUser(createUser: CreateUserDto): User {
    const { email, name, type } = createUser;
    const newUser = new User(email, name, type);
    if (this.allUsers.find((item) => item.email === email)) {
      throw new BadRequestException('User with that email already exists');
    }
    this.allUsers.push(newUser);
    this.logger.log('User created', { newUser });
    return newUser;
  }

  findAllUsers(): User[] {
    this.logger.log('Total length: ' + this.allUsers.length);
    return this.allUsers;
  }

  findOneUser(id: string): User {
    let user = this.allUsers.find((item) => item.id === Number(id));
    this.logger.log({ user });
    return user;
  }

  updateUser(updateUser: UpdateUserDto, id: string): User {
    let index = this.allUsers.findIndex((item) => item.id === Number(id));
    const user = this.allUsers[index];
    if (!user) {
      this.logger.error('User for update not found', {
        id: id,
        data: updateUser,
      });
      throw new NotFoundException('User not found');
    }
    Object.assign(user, {
      ...Object.fromEntries(
        Object.entries(updateUser).filter(([_, v]) => v !== undefined),
      ),
    });
    this.allUsers[index] = user;
    this.logger.log('User updated', { user });
    return user;
  }

  deleteUser(id: string): string {
    let index = this.allUsers.findIndex((item) => item.id === Number(id));
    if (!this.allUsers[index]) {
      throw new NotFoundException('User not found');
    }
    let user = this.allUsers[index];
    this.logger.log('User deleted', { user });
    this.allUsers.splice(index, 1);
    return `Deleted user #${id}`;
  }

  filterUsers(filters: FilterUserDto): User[] {
    let filteredUsers = this.allUsers;

    for (let key of Object.keys(filters)) {
      // filteredUsers = filteredUsers.find((item) => item.key);

      Object.entries(filters).filter(([k, v]) => v !== undefined);
    }

    return [];
  }
}
