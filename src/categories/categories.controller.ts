import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { FindOneParams } from 'src/common/pipes/validation.pipe';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto)
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
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
