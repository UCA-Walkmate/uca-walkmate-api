import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) { }

  findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  findOne(id: number): Promise<Location> {
    return this.locationRepository.findOneBy({ id });
  }

  findByFragment(query: string): Promise<Location[]> {
    // Make a function to search by fragment of its location name
    return this.locationRepository.find({ 
      where: {
        name: ILike(`%${query}%`) 
      }
    });

  }

}
