import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Comment } from 'src/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Comment]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService]
})
export class TaskModule { }
