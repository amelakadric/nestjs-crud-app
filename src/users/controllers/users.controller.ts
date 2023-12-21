import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../../database/entities/user.entity';
import { FilterUserDto } from '../dtos/filter-user.dto';
import { filter } from 'rxjs';
import { ParseIntPipe } from 'src/utils/parse-int.pipe';

@Controller('users')
export class UsersController {
  logger: Logger;
  constructor(private usersService: UsersService) {
    this.logger = new Logger(UsersController.name);
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<User> {
    this.logger.log('Creating user', createUser);
    return this.usersService.createUser(createUser);
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    this.logger.log('Fetching all users');
    return this.usersService.findAllUsers();
  }

  @Get('filters')
  async filterUsers(@Query() filters: FilterUserDto): Promise<User[]> {
    return this.usersService.filterUsers(filters);
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<User> {
    this.logger.log('Fetching user #' + id);
    return this.usersService.findOneUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    this.logger.log('Updating user #' + id);
    return this.usersService.updateUser(updateUser, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    this.logger.log('Deleting user #' + id);

    return this.usersService.deleteUser(id);
  }
}
