import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateEventDto {

    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be a string' })
    @MinLength(3, { message: 'Name must have at least 3 characters' })
    name: string;

    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Description must be a string' })
    @MinLength(3, { message: 'Description must have at least 3 characters' })
    description: string;

    @IsNotEmpty({ message: 'Date must not be empty' })
    @IsDateString()
    date: Date;

    @IsNumber()
    @IsNotEmpty({ message: 'Location ID must not be empty' })
    locationId: number;
}
