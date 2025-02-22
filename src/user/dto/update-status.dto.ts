import { IsBoolean } from "class-validator";


export class UpdateStatus{
    @IsBoolean()
    status?: boolean;
}