import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Match } from "src/common/decorators/match.decorator";

export class SignUpDto {

    @IsNotEmpty({ message: 'Name must not be empty' })
    @MinLength(3, { message: 'Name must have at least 3 characters' })
    @IsString({ message: 'Name must be string' })
    name: string;

    @IsNotEmpty({ message: 'Email must not be empty' })
    @IsEmail()
    email: string

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
    })
    password: string;

    @Match(SignUpDto, (s) => s.password, { message: 'Passwords do not match' })
    confirmPassword: string;
}