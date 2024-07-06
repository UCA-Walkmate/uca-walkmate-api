import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be string' })
    name: string;

}
