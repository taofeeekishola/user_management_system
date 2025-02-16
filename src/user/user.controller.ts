import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
