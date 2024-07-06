import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersServices');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto
    });

    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    try {
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException('Unexpected error');
    }

  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new NotFoundException(`User with id ${id} not found`);

    const result = await this.userRepository.delete(user);

    return result.affected;
  }
}
