import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../task.entity';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @IsEnum(TaskStatus)
    status: TaskStatus
}
