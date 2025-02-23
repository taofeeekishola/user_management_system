import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";


export class UpdateStatus{
    @IsBoolean()
    @ApiProperty({
        description: 'User status'
    })
    status?: boolean;
}