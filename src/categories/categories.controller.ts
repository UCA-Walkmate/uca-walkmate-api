import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FindOneParams } from 'src/common/pipes/validation.pipe';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<Category> {
    return this.categoriesService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: FindOneParams, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(params.id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    return this.categoriesService.remove(params.id);
  }
}
