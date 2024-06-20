import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
  ) { }

  findAll(): Promise<Building[]> {
    return this.buildingRepository.find();
  }

  findOne(id: number): Promise<Building> {
    return this.buildingRepository.findOneBy({ id });
  }

}
