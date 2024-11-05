import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserBody {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEmail()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    password: string;
}