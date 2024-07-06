import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  private readonly logger = new Logger('CategoriesService');

  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) { }

  async create(createSubjectDto: CreateSubjectDto) {
    const { name, userId, locationId } = createSubjectDto;

    const userExists = await this.userRepository.findOne({ where: { id: userId } });
    const locationExists = await this.locationRepository.findOne({ where: { id: locationId } });

    if (!userExists)
      throw new NotFoundException(`User with id ${userId} not found`);

    if (!locationExists)
      throw new NotFoundException(`Location with id ${locationId} not found`);

    try {
      const newSubject = this.subjectRepository.create({ name, userId, locationId });
      await this.subjectRepository.save(newSubject);

      return newSubject;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find();
  }

  async findOne(id: number): Promise<Subject> {
    return await this.subjectRepository.findOneBy({ id });
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.subjectRepository.preload({
      id: +id,
      ...updateSubjectDto
    });
    const userExists = await this.userRepository.findOne({ where: { id: updateSubjectDto.userId } });
    const locationExists = await this.locationRepository.findOne({ where: { id: updateSubjectDto.locationId } });

    if (!subject)
      throw new NotFoundException(`Subject with id ${id} not found`);

    if (!userExists)
      throw new NotFoundException(`User with id ${updateSubjectDto.userId} not found`);

    if (!locationExists)
      throw new NotFoundException(`Location with id ${updateSubjectDto.locationId} not found`);

    try {
      await this.subjectRepository.save(subject);

      return subject;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error');
    }

  }

  async remove(id: number) {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject)
      throw new NotFoundException(`Subject with id ${id} not found`);

    const result = await this.subjectRepository.delete(subject);

    return result.affected;
  }
}
