import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

    @IsNotEmpty({ message: 'Name must not be empty' })
    @IsString({ message: 'Name must be string' })
    name: string;

}
