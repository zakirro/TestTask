import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { Comment } from 'src/entities/comment.entity';
import { TaskModule } from 'src/task/task.module';
import { Task } from 'src/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Task]),
  ],
  providers: [CommentsService],
  controllers: [CommentController],
  exports: [CommentsService]
})
export class CommentModule { }
