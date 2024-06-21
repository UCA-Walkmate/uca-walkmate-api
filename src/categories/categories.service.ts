import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger('CategoriesService');

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const name = createCategoryDto.name;
    const exists = await this.categoryRepository.findOne({ where: { name } });

    if (exists)
      throw new ConflictException(`Category with name ${name} already exists`);

    try {
      const newCategory = this.categoryRepository.create({ name });
      await this.categoryRepository.save(newCategory);

      return newCategory;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error');
    }

  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOneBy({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id: +id,
      ...updateCategoryDto
    });

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    try {
      await this.categoryRepository.save(category);

      return category;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error');
    }

  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    const result = await this.categoryRepository.delete(category);

    return result.affected;
  }
}
