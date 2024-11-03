import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Task, TaskStatus } from './task.entity';
import { User } from '../user/user.entity';
import { Pageable, PageableResponseDto, PageFactory } from 'nestjs-mikro-orm-pageable';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ElasticService } from 'src/tools/elastic/elastic.service';

@Injectable()
export class TaskService {
  constructor(
    readonly entityManager: EntityManager,
    @InjectRepository(Task) private readonly taskRepository,
    readonly elasticService: ElasticService

  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.entityManager.findOneOrFail(User, {
      email: createTaskDto.userEmail
    });

    const task = this.entityManager.create(Task, {
      ...createTaskDto,
      user
    });
    task.status = TaskStatus.Planned
    
    await this.entityManager.persistAndFlush(task)
    await this.elasticService.indexDocument('tasks', task.id, {title: task.title, description: task.description})


    return task
  }

  async search(search: string, page: number, size: number) {
    const res = await this.elasticService.searchDocuments('tasks', search, ['title', 'description'], page, size, ['id'])
    const taskIds = res.results.map((hit) => hit._id);

    const tasks = await this.entityManager.find(Task, { id: { $in: taskIds } });

    return {
      total: res.total,
      totalPages: res.totalPages,
      currentPage: res.currentPage,
      pageSize: res.pageSize,
      tasks,
  };
  }

  async findAll(pageable: Pageable, searchTerm?: string): Promise<PageableResponseDto<Task>> {
    const query = this.entityManager.createQueryBuilder(Task, 'task');

    if (searchTerm) {
      query.where(`to_tsvector('english', task.title || ' ' || task.description) @@ plainto_tsquery(?)`, [searchTerm]);
    }

    // @ts-ignore
    return await new PageFactory(pageable, this.taskRepository).create();
  }

  async findOne(id: string) {
    return await this.entityManager.findOneOrFail(Task, id)
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.entityManager.findOneOrFail(Task, id);

    updateTaskDto = {
      ...updateTaskDto,
      description: updateTaskDto.description || task.description,
      title: updateTaskDto.title || task.title,
    }
    this.entityManager.assign(task, updateTaskDto);

    await this.elasticService.indexDocument('tasks', id, {title: updateTaskDto.title, description: updateTaskDto.description})

    await this.entityManager.persistAndFlush(task)  

    return {
      message: 'Task updated successfully',
    }
  }

  async remove(id: string) {
    const task = await this.entityManager.findOneOrFail(Task, id);

    return await this.entityManager.removeAndFlush(task)  }
}
