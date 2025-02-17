import { Body, Controller, Delete, Get, NotAcceptableException, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatus } from './dto/update-status.dto';

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

    @Put(':id')
    async updateOne(@Param('id') id:string, @Body() input: UpdateStatus){
        const user = await this.userService.updateOne(id, input);
        return user;
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: string){
        return this.userService.deleteOne(id)
    }
}
