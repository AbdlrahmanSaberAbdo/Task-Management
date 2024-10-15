import { IsDateString, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDateString()
    from: Date

    @IsDateString()
    to: Date

    @IsNotEmpty()
    @IsUUID()
    user: string
}
