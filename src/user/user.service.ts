import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(readonly entityManager: EntityManager) {}
  
  async create(createUserDto: CreateUserDto) {
    const user = this.entityManager.create(User, createUserDto);
    await this.entityManager.persistAndFlush(user)

    return user
  }

  async findAll() {
    return this.entityManager.find(User, {})
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
