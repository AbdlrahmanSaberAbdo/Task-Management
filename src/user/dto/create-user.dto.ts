import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Validate, validate } from "class-validator";
import { GenderEnum } from "../user.entity";

export class CreateUserDto {
    @IsNotEmpty({ message: 'The related entity is required.' })
    @IsString()
    firstname: string;

    @IsEmail()
    email: string

    @IsNotEmpty({ message: 'The related entity is required.' })
    lastname: string;

    @IsNotEmpty({ message: 'The related entity is required.' })
    @IsNumber()
    age: number

    @IsNotEmpty({ message: 'The related entity is required.' })
    @IsEnum(GenderEnum)
    gender: GenderEnum

    @IsNotEmpty({ message: 'The related entity is required.' })
    @IsString()
    jobTitle: string
}
 