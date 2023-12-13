import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './models/user.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('createUser')
  createUser(@Body() createUser: CreateUserDto) {
    return this.usersService.createUser(createUser);
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Put('updateUser/:id')
  updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.usersService.updateUser(updateUser, id);
  }

  @Delete('deleteUser/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
