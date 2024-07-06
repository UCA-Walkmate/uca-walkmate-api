import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity';

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
