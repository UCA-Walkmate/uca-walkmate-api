import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateSubjectDto { 

    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(3, { message: 'Name must have at least 3 characters' })
    name: string;

    @IsNumber()
    // @IsNotEmpty({ message: 'User ID must not be empty' })
    userId: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Location ID must not be empty' })
    locationId: number;

}
