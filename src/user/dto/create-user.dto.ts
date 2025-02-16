import { IsBoolean , IsDate, IsString} from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto{
    @IsString()
    name: string;

    @IsBoolean()
    status?: boolean;

    @IsDate()
    @Type(() => Date)
    registerDate: Date
}