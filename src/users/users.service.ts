import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from 'src/models/User';

@Injectable()
export class UsersService {

     private readonly allUsers:CreateUserDto[] = []

    create(user: User){
        return this.allUsers.push(user);
    }

    findAll(){
        return this.allUsers;
    }

    findOne(id: string){
        return this.allUsers.find(item=>item.id===Number(id));
    }

    update(updateUser: CreateUserDto, id:string){
        let index = this.allUsers.findIndex(item=>item.id===Number(id));
        this.allUsers[index]=updateUser;
        return updateUser;
    }

    delete(id: string){
        let index = this.allUsers.findIndex(item=>item.id===Number(id));
        this.allUsers.splice(index, 1);
        return `Deleted user #${id}`
    }
    
}
