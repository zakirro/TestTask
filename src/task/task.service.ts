import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Comment } from 'src/entities/comment.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) { }

    async createTask(dto: CreateTaskDto, user: User) {
        const task = this.taskRepository.create({
            description: dto.description,
            user,
        });
        return this.taskRepository.save(task);
    }

    async getAllTasks() {
        return this.taskRepository.find({
            relations: ['user', 'comments', 'comments.user'],
            order: { created_at: 'DESC' },
        });
    }

    async getTaskById(id: string) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['user', 'comments', 'comments.user'],
        });
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }

    async updateTask(id: string, dto: UpdateTaskDto, user: User) {
        const task = await this.getTaskById(id);
        if (task.user.id !== user.id) throw new ForbiddenException('Not allowed');
        task.description = dto.description ?? task.description;
        return this.taskRepository.save(task);
    }

    async deleteTask(id: string, user: User) {
        const task = await this.getTaskById(id);
        if (task.user.id !== user.id) throw new ForbiddenException('Not allowed');
        return this.taskRepository.remove(task);
    }

}
