import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdateStatus } from './dto/update-status.dto';

@Injectable()
export class UserService {
    private users: User[] = [];

    async findAll(){
        return this.users
    }

    async findOne(id: string){
        return this.users.find((user) => user.id === id)
    }

    async createUser(createUserDto: CreateUserDto){
        const newUser = {...createUserDto, id: randomUUID()}
        this.users.push(newUser);
        

        return newUser;
    }

    async updateOne(id: string, updateStatusDto: UpdateStatus){
        const user = this.users.find((user)=> user.id === id)

        if (!user) {
            throw new Error('User not found');
        }

        user.status = updateStatusDto.status;

        return user
        
    }

    async deleteOne(id: string){
       this.users =  this.users.filter((user) => user.id !== id)
       return {message: 'User deleted successfully'}
    }
}
