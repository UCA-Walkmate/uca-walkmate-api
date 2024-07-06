import { Controller, Get, Param } from '@nestjs/common';
import { Location } from './entities/location.entity';
import { LocationsService } from './locations.service';
import { FindOneParams } from 'src/common/pipes/validation.pipe';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  @Get()
  findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<Location> {
    return this.locationsService.findOne(params.id);
  }

}
