import { IsEnum, IsNumber, IsString } from "class-validator";
// import { GenderEnum } from "../user.entity";

export class CreateUserDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsNumber()
    age: number

    @IsEnum(GenderEnum)
    gender: GenderEnum

    @IsString()
    jobTitle: string
}
