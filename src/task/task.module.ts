import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Task } from './task.entity';
import { ElasticModule } from 'src/tools/elastic/elastic.module';

@Module({
  imports: [MikroOrmModule.forFeature([Task]), ElasticModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
