import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FindOneParams } from 'src/common/pipes/validation.pipe';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<Event> {
    return this.eventsService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: FindOneParams, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(params.id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    return this.eventsService.remove(params.id);
  }
}
