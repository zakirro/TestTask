import { Controller, Post, Body, Get, Query, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-access.guard';
import type { Request } from 'express';
import { User } from '../entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    createComment(@Body() dto: CreateCommentDto, @Req() req: Request) {
        const user = req.user as User;
        return this.commentsService.createComment(dto, user);
    }

    @Get()
    getComments(@Query('task_id') task_id: string) {
        return this.commentsService.getCommentsByTask(task_id);
    }

    @Get(':id')
    getComment(@Param('id') id: string) {
        return this.commentsService.getCommentById(id);
    }

    @Patch(':id')
    updateComment(@Param('id') id: string, @Body() dto: UpdateCommentDto, @Req() req: Request) {
        const user = req.user as User;
        return this.commentsService.updateComment(id, dto, user);
    }

    @Delete(':id')
    deleteComment(@Param('id') id: string, @Req() req: Request) {
        const user = req.user as User;
        return this.commentsService.deleteComment(id, user);
    }
}
