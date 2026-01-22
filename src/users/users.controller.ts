import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    create(@Body() dto: CreateUserDTO) {
        return this.userService.create(dto)
    }

    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
        return this.userService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id)
    }
}
