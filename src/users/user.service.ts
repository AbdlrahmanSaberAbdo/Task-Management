import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(readonly entityManager: EntityManager) {}
  
  async create(createUserDto: CreateUserDto) {
    return await this.entityManager.persistAndFlush(createUserDto)
  }

  async findAll() {
    return this.entityManager.find(User, {})
  }

  async findOne(id: string) {
    return await this.entityManager.findOneOrFail(User, id)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.entityManager.findOneOrFail(User, id);

    this.entityManager.assign(user, updateUserDto);

    return await this.entityManager.persistAndFlush(user)
  }

  async remove(id: string) {
    const user = await this.entityManager.findOneOrFail(User, id);

    return await this.entityManager.removeAndFlush(user)
  }
}
