import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { FindOneParams } from 'src/common/pipes/validation.pipe';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<Role> {
    return this.rolesService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: FindOneParams, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(params.id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    return this.rolesService.remove(params.id);
  }
}
