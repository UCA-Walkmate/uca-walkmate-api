import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { log } from 'console';

@Injectable()
export class EventsService {
  private readonly logger = new Logger('CategoriesService');

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) { }

  async create(createEventDto: CreateEventDto) {
    const { name, description, date, locationId } = createEventDto;

    try {
      const newEvent = this.eventRepository.create({ name, description, date, locationId });
      await this.eventRepository.save(newEvent);

      return newEvent;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error');
    }

  }

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    return await this.eventRepository.findOneBy({ id });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.preload({
      id: +id,
      ...updateEventDto
    });

    try {
      await this.eventRepository.save(event);

      return event;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error');
    }

  }

  async remove(id: number) {
    const event = await this.eventRepository.findOneBy({ id });
  
    if (!event)
      throw new NotFoundException(`Event with id ${id} not found`);

    const result = await this.eventRepository.delete(event);

    return result.affected;
  }
}
