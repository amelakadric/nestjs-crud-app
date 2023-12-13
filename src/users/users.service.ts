import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly allUsers: User[] = [];

  createUser(createUser: CreateUserDto) {
    const { email, name, type } = createUser;
    const newUser = new User(email, name, type);
    this.allUsers.push(newUser);
    return newUser;
  }

  findAllUsers() {
    return this.allUsers;
  }

  findOneUser(id: string) {
    return this.allUsers.find((item) => item.id === Number(id));
  }

  updateUser(updateUser: UpdateUserDto, id: string) {
    let index = this.allUsers.findIndex((item) => item.id === Number(id));
    const user = this.allUsers[index];
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, {
      ...Object.fromEntries(
        Object.entries(updateUser).filter(([_, v]) => v !== undefined),
      ),
    });
    this.allUsers[index] = user;

    return user;
  }

  deleteUser(id: string) {
    let index = this.allUsers.findIndex((item) => item.id === Number(id));
    if (!this.allUsers[index]) {
      throw new NotFoundException('User not found');
    }
    this.allUsers.splice(index, 1);
    return `Deleted user #${id}`;
  }
}
