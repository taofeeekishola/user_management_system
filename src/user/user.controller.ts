import { Body, Controller, DefaultValuePipe, Delete, Get, NotAcceptableException, Param, ParseDatePipe, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatus } from './dto/update-status.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';

@Controller('user')
export class UserController {
   
    constructor(private readonly usersService: UserService){}

    //creating a user
    @Post()
    @ApiOperation({summary: 'Creates a new user'})
    @ApiCreatedResponse({description:'User created successfully.',
        type:CreateUserDto,
    })
    @ApiNotFoundResponse({description:'Invalid data provided',
        type: ValidationError
    })
    createUser(@Body() input: CreateUserDto){
        return this.usersService.createUser(input)
    }
    
    //getting all the users
    @Get()
    @ApiOperation({summary: 'Fetch a list of users'})
    @ApiOkResponse({description:'Users found.',
        type:CreateUserDto,
        isArray: true
    })
    @ApiNotFoundResponse({description:'No Users found.'})
    findAll(@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, //limiting the number of users returned by the user and making it optional
            @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, //providing the number of page 
            @Query('datejoined', new ParseDatePipe({optional:true})) datejoined: Date ){ 
        return this.usersService.findAll(limit, page, datejoined)
    }

    //getting a single user
    @Get(':id')
    @ApiOperation({summary: 'Fetch a single user'})
    @ApiOkResponse({description:'User found.',
        type:CreateUserDto,
    })
    @ApiNotFoundResponse({description:'No User found.'})
    async findOne(@Param('id') id: string){
        return this.usersService.findOne(id)
    }

    //updating the status value
    @Patch(':id')
    @ApiOperation({summary: 'Update status of single user'})
    @ApiOkResponse({description:'User staus updated.',
        type:UpdateStatus,
    })
    @ApiNotFoundResponse({description:'No User found.'})
    async updateOne(@Param('id') id: string, @Body() input: UpdateStatus){
        return this.usersService.updateOne(id,input)
    }

    //deleting a user
    @Delete(':id')
    @ApiOperation({summary: 'Delete a single user'})
    @ApiOkResponse({description:'User deleted.'})
    @ApiNotFoundResponse({description:'No User found.'})
    async deleteOne(@Param('id') id: string){
        return this.usersService.deleteOne(id)
    }
}
