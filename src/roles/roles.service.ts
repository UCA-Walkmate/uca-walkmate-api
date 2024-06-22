import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  private readonly logger = new Logger('CategoriesService');

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const name = createRoleDto.name;
    const exists = await this.roleRepository.findOne({ where: { name } });

    if (exists)
      throw new ConflictException(`Role with name ${name} already exists`);

    try {
      const newRole = this.roleRepository.create({ name });
      await this.roleRepository.save(newRole);

      return newRole;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error');
    }

  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    return await this.roleRepository.findOneBy({ id });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.preload({
      id: +id,
      ...updateRoleDto
    });

    if (!role)
      throw new NotFoundException(`Role with id ${id} not found`);

    try {
      await this.roleRepository.save(role);

      return role;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error');
    }

  }

  async remove(id: number) {
    const role = await this.roleRepository.findOneBy({ id });

    if (!role)
      throw new NotFoundException(`Role with id ${id} not found`);

    const result = await this.roleRepository.delete(role);

    return result.affected;
  }
}
