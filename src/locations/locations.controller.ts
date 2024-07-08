import { Controller, Get, Param, Query } from '@nestjs/common';
import { Location } from './entities/location.entity';
import { LocationsService } from './locations.service';
import { FindOneParams } from 'src/common/pipes/validation.pipe';
import { SkipAuth } from 'src/auth/decorators/skip-auth.decorator';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  @Get()
  findAll(): Promise<Location[]> {
    return this.locationsService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param() params: FindOneParams): Promise<Location> {
    return this.locationsService.findOne(params.id);
  }

  @SkipAuth()
  @Get('search')
  findBySlug(@Query('fragment') query): Promise<Location[]> {
    return this.locationsService.findByFragment(query);
  }

}
