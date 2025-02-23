import { Body, Controller, Delete, Get, NotAcceptableException, Param, ParseDatePipe, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatus } from './dto/update-status.dto';

@Controller('user')
export class UserController {
   
    constructor(private readonly usersService: UserService){}

    //creating a user
    @Post()
    createUser(@Body() input: CreateUserDto){
        return this.usersService.createUser(input)
    }
    
    //getting all the users
    @Get()
    findAll(@Query('limit', new ParseIntPipe({optional:true})) limit: number, //limiting the number of users returned by the user and making it optional
            @Query('page', new ParseIntPipe({optional: true})) page: number, //providing the number of page 
            @Query('datejoined', new ParseDatePipe({optional:true})) datejoined: Date ){ 
        return this.usersService.findAll(limit, page, datejoined)
    }

    //getting a single user
    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.usersService.findOne(id)
    }

    //updating the status value
    @Patch(':id')
    async updateOne(@Param('id') id: string, @Body() input: UpdateStatus){
        return this.usersService.updateOne(id,input)
    }

    //deleting a user
    @Delete(':id')
    async deleteOne(@Param('id') id: string){
        return this.usersService.deleteOne(id)
    }
}
