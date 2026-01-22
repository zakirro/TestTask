import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../entities/user.entity';
import { Task } from '../entities/task.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    async createComment(dto: CreateCommentDto, user: User) {
        const task = await this.taskRepository.findOne({ where: { id: dto.task_id } });
        if (!task) throw new NotFoundException('Task not found');

        const comment = this.commentRepository.create({
            content: dto.content,
            task,
            user,
        });

        return this.commentRepository.save(comment);
    }

    async getCommentsByTask(task_id: string) {
        return this.commentRepository.find({
            where: { task: { id: task_id } },
            relations: ['user'],
            order: { created_at: 'DESC' },
        });
    }

    async getCommentById(id: string) {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['user', 'task'],
        });
        if (!comment) throw new NotFoundException('Comment not found');
        return comment;
    }

    async updateComment(id: string, dto: UpdateCommentDto, user: User) {
        const comment = await this.getCommentById(id);
        if (comment.user.id !== user.id) throw new ForbiddenException('Not allowed');
        comment.content = dto.content;
        return this.commentRepository.save(comment);
    }

    async deleteComment(id: string, user: User) {
        const comment = await this.getCommentById(id);
        if (comment.user.id !== user.id) throw new ForbiddenException('Not allowed');
        return this.commentRepository.remove(comment);
    }
}
