import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { User } from 'src/users/entities/user.entity';
import { Location } from 'src/locations/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, User, Location])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule { }
