import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    createUser(@Body() createUser: CreateUserDto){
        console.log(createUser)
        return this.usersService.create(createUser);
    }

    @Get()
    findAllUsers(){
        return this.usersService.findAll()
    }

    @Get(':id')
    findUser(@Param('id') id: string){
        return this.usersService.findOne(id);
    }


    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUser: CreateUserDto){
        return this.usersService.update(updateUser, id);
    }

    @Delete(':id')
    deleteUser(@Param('id')id: string){
        return this.usersService.delete(id);
    }
}
