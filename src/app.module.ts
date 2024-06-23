// ** NestJS Imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// ** Module Imports
import { BuildingsModule } from './buildings/buildings.module';
import { CategoriesModule } from './categories/categories.module';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';
import { LocationsModule } from './locations/locations.module';
import { RolesModule } from './roles/roles.module';
import { SubjectsModule } from './subjects/subjects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
