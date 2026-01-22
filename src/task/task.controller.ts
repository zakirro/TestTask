import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-access.guard';
import type { Request } from 'express';
import { User } from '../entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    createTask(@Body() dto: CreateTaskDto, @Req() req: Request) {
        const user = req.user as User;
        return this.tasksService.createTask(dto, user);
    }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    getTask(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Req() req: Request) {
        const user = req.user as User;
        return this.tasksService.updateTask(id, dto, user);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string, @Req() req: Request) {
        const user = req.user as User;
        return this.tasksService.deleteTask(id, user);
    }
}
