import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UpdateStatus } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository:Repository<User>
    ){}
    
    private users: User[] = [];

    //creating a user
    async createUser(createUserDto: CreateUserDto){
        const user = this.usersRepository.create(createUserDto)

        return await this.usersRepository.save(user)
    }

    //getting all the users
    async findAll(limit, page, datejoined){
        //inittialising an empty object
        const whereCondition: any = {};

        //creating an object and assigning it
        if (datejoined){
            whereCondition.datejoined >= datejoined;
        }

        const [users, total] = await this.usersRepository.findAndCount({
            where: whereCondition,
            take: limit,
            skip: (page -1) * limit,
            order:{registerDate: "DESC"}
        });

        return {
            data: users,
            total, 
            currentPage: page,
            totalPages: Math.ceil(total/limit)
        }
        
    }

    //getting a single user
    async findOne(id: string){
        return await this.usersRepository.findOne({where :{id}});
    }

    //updating the status value
    async updateOne(id: string, updateStatusDto: UpdateStatus){
        const user = await this.usersRepository.findOne({where : {id}});

        if(!user){
            throw new NotFoundException
        }

        //this uses the value in updateStatusDto to replace the equivalent in user
        Object.assign(user, updateStatusDto)
        return await this.usersRepository.save(user);
    }

    //deleting a user
    async deleteOne(id: string){
       const user = await this.findOne(id)

       if(!user){
            throw new NotFoundException
       }

       await this.usersRepository.remove(user)

       return {message: 'User deleted successfully'}
    }
}
