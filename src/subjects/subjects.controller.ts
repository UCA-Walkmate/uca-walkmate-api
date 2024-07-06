import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FindOneParams } from 'src/common/pipes/validation.pipe';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.subjectsService.findOne(params.id);
  }

  @Get('user/:id')
  findByUserId(@Param() params: FindOneParams) {
    return this.subjectsService.findByUserId(params.id);
  }

  @Patch(':id')
  update(@Param() params: FindOneParams, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(params.id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    return this.subjectsService.remove(params.id);
  }
}
