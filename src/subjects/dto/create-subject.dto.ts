import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateSubjectDto { 

    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(3, { message: 'Name must have at least 3 characters' })
    name: string;

    @IsNumber()
    @IsNotEmpty({ message: 'User ID must not be empty' })
    userId: number;

    @IsNotEmpty({ message: 'Schedule must not be empty' })
    @IsString({ message: 'Schedule must be a string' })
    schedule: string;
    
    @IsNumber()
    @IsNotEmpty({ message: 'Image id must not be empty' })
    image: number;

    @IsNotEmpty({ message: 'Status must not be empty' })
    @IsString({ message: 'Status must be a string' })
    status: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Location ID must not be empty' })
    locationId: number;

}
