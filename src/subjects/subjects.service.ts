import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) { }


  create(createSubjectDto: CreateSubjectDto) {
    return 'This action adds a new subject';
  }

  findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  findOne(id: number): Promise<Subject> {
    return this.subjectRepository.findOneBy({ id: id });
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
