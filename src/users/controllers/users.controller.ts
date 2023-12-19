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
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
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
  createUser(@Body() createUser: CreateUserDto) {
    this.logger.log('Creating user', createUser);
    return this.usersService.createUser(createUser);
  }

  @Get()
  findAllUsers() {
    this.logger.log('Fetching all users');
    return this.usersService.findAllUsers();
  }

  @Get('filters')
  filterUsers(@Query() filters: FilterUserDto) {
    return this.usersService.filterUsers(filters);
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    this.logger.log('Fetching user #' + id);
    return this.usersService.findOneUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    this.logger.log('Updating user #' + id);
    return this.usersService.updateUser(updateUser, id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.logger.log('Deleting user #' + id);

    return this.usersService.deleteUser(id);
  }
}
