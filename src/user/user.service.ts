import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdateStatus } from './dto/update-status.dto';

@Injectable()
export class UserService {
    private users: User[] = [];

    //creating a user
    async createUser(createUserDto: CreateUserDto){
        const newUser = {...createUserDto, id: randomUUID()}
        this.users.push(newUser);
        

        return newUser;
    }

    //getting all the users
    async findAll(limit, datejoined){
        let result  = this.users

        if(limit){
            result = result.slice(0,limit) 
        }

        if(datejoined){
            //the value in the registerDate in the array needs to be converted to a date datatype for the comparison to work
            result = result.filter(user => new Date(user.registerDate) >= datejoined)

        }
        
        return result
    }

    //getting a single user
    async findOne(id: string){
        return this.users.find((user) => user.id === id)
    }

    //updating the status value
    async updateOne(id: string, updateStatusDto: UpdateStatus){
        const user = this.users.find((user)=> user.id === id)

        if (!user) {
            throw new Error('User not found');
        }

        user.status = updateStatusDto.status;

        return user
        
    }

    //deleting a user
    async deleteOne(id: string){
       this.users =  this.users.filter((user) => user.id !== id)
       return {message: 'User deleted successfully'}
    }
}
