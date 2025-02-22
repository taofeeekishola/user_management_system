import { Body, Controller, Delete, Get, NotAcceptableException, Param, ParseDatePipe, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatus } from './dto/update-status.dto';

@Controller('user')
export class UserController {
    constructor(private  userService: UserService ) {}

    //creating a user
    @Post()
    createUser(@Body() input: CreateUserDto){
        return this.userService.createUser(input)
    }
    
    //getting all the users
    @Get()
    findAll(@Query('limit', new ParseIntPipe({optional:true})) limit: number, //limiting the number of users returned by the user and making it optional
            @Query('datejoined', new ParseDatePipe({optional:true})) datejoined: Date ){ 
        return this.userService.findAll(limit, datejoined)
    }

    //getting a single user
    @Get(':id')
    async findOne(@Param('id') id: string){
        const user = await this.userService.findOne(id);
        if(!user){
            throw new NotAcceptableException('User not found')
        }

        return user;
    }

    //updating the status value
    @Put(':id')
    async updateOne(@Param('id') id:string, @Body() input: UpdateStatus){
        const user = await this.userService.updateOne(id, input);
        return user;
    }

    //deleting a user
    @Delete(':id')
    async deleteOne(@Param('id') id: string){
        return this.userService.deleteOne(id)
    }
}
