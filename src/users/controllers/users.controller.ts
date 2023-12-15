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
import { User } from '../models/user.model';
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
  createUser(@Body() createUser: CreateUserDto): User {
    this.logger.log('Creating user', createUser);
    return this.usersService.createUser(createUser);
  }

  @Get()
  findAllUsers(): User[] {
    this.logger.log('Fetching all users');
    return this.usersService.findAllUsers();
  }

  @Get('filters')
  filterUsers(@Query(new ParseIntPipe()) filters: FilterUserDto) {
    // let filters = new FilterUserDto({ email: email, name: name, type: type });
    return this.usersService.filterUsers(filters);
  }

  @Get(':id')
  findUser(@Param('id') id: string): User {
    this.logger.log('Fetching user #' + id);
    return this.usersService.findOneUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto): User {
    this.logger.log('Updating user #' + id);
    return this.usersService.updateUser(updateUser, id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): string {
    this.logger.log('Deleting user #' + id);

    return this.usersService.deleteUser(id);
  }
}
