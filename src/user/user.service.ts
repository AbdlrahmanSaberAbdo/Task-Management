import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Pageable, PageableResponseDto, PageFactory } from 'nestjs-mikro-orm-pageable';

@Injectable()
export class UserService {
  constructor(readonly entityManager: EntityManager,
    @InjectRepository(User) private readonly userRepository
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    const user = this.entityManager.create(User, createUserDto);
    await this.entityManager.persistAndFlush(user)

    return user
  }

  async findAll(pageable: Pageable): Promise<PageableResponseDto<User>> {
    
    // @ts-ignore
    return await new PageFactory(pageable, this.userRepository).create();
  }

  async findOne(email: string) {
    return await this.entityManager.findOneOrFail(User, { email }, {populate: ['tasks']})
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.entityManager.findOneOrFail(User, { email });

    this.entityManager.assign(user, updateUserDto);

    await this.entityManager.persistAndFlush(user)

    return user
  }

  async remove(email: string) {
    const user = await this.entityManager.findOneOrFail(User, { email });

    await this.entityManager.removeAndFlush(user)

    return {
      message: 'User deleted successfully'
    }
  }
}
