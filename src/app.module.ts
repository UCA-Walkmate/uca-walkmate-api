// ** NestJS Imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// ** Module Imports
import { DatabaseModule } from './database/database.module';
import { SubjectsModule } from './subjects/subjects.module';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { BuildingsModule } from './buildings/buildings.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    SubjectsModule,
    LocationsModule,
    UsersModule,
    RolesModule,
    CategoriesModule,
    BuildingsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
