import { Body, Controller, Delete, Get, NotAcceptableException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private  userService: UserService ) {}

    @Post()
    createUser(@Body() input: CreateUserDto){
        return this.userService.createUser(input)
    }
    
    @Get()
    findAll(){
        return this.userService.findAll()

    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        const user = await this.userService.findOne(id);
        if(!user){
            throw new NotAcceptableException('User not found')
        }

        return user;
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: string){
        return this.userService.deleteOne(id)
    }
}
