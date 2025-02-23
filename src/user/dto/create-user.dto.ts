import { IsBoolean , IsDate, IsDateString, IsString} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @IsString()
    @ApiProperty({
        description: 'User name',
        example: 'Taofeek Ishola'
    })
    name: string;

    @IsBoolean()
    @ApiProperty({
        description: 'Current status of user',
        required: false
    })
    status?: boolean;

    @IsDateString()
    @ApiProperty({
        description: 'Date registered',
        required: false,
        type: String,
        format: 'date-time'
    })
    registerDate: Date
}