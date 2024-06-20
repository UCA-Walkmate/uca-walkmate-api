import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) { }

  @Get()
  findAll(): Promise<Building[]> {
    return this.buildingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Building> {
    return this.buildingsService.findOne(+id);
  }

}
