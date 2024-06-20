import { Controller, Get, Param } from '@nestjs/common';
import { FindOneParams } from 'src/common/pipes/validation.pipe';
import { BuildingsService } from './buildings.service';
import { Building } from './entities/building.entity';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) { }

  @Get()
  findAll(): Promise<Building[]> {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params : FindOneParams): Promise<Building> {
    return this.buildingsService.findOne(params.id);
  }

}
