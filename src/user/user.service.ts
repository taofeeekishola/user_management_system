import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
    private users: User[] = [];

    async findAll(){
        return this.users
    }

    async createUser(createUserDto: CreateUserDto){
        const newUser = {...createUserDto, id: randomUUID()}
        this.users.push(newUser);
        

        return newUser;
    }
}
