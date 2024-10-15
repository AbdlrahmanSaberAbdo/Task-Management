import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Task, TaskStatus } from './task.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TaskService {
  constructor(readonly entityManager: EntityManager) {}

  async create(createTaskDto: CreateTaskDto) {
    await this.entityManager.findOneOrFail(User, createTaskDto.user);

    const task = this.entityManager.create(Task, createTaskDto);
    task.status = TaskStatus.Planned
    
    await this.entityManager.persistAndFlush(task)

    return task
  }

  async findAll(searchTerm?: string) {
    const query = this.entityManager.createQueryBuilder(Task, 'task');

    if (searchTerm) {
      query.where(`to_tsvector('english', task.title || ' ' || task.description) @@ plainto_tsquery(?)`, [searchTerm]);
    }

    return await query.getResultList();
  }

  async findOne(id: string) {
    return await this.entityManager.findOneOrFail(Task, id)
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.entityManager.findOneOrFail(Task, id);

    this.entityManager.assign(task, updateTaskDto);

    return await this.entityManager.persistAndFlush(task)  
  }

  async remove(id: string) {
    const task = await this.entityManager.findOneOrFail(Task, id);

    return await this.entityManager.removeAndFlush(task)  }
}
