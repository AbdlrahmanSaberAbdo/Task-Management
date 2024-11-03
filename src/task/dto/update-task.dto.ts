import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../task.entity';
import { IsEnum, IsString, isString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    title?: string

    @IsString()
    description?: string

    @IsEnum(TaskStatus)
    status: TaskStatus
}
