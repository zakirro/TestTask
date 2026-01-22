import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO } from './DTO/create-user.dto';
import { UpdateUserDTO } from './DTO/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(dto: CreateUserDTO): Promise<User> {
        const hashedPassword = await bcrypt.hash(dto.password, 10)
        const user = this.userRepository.create({
            ...dto,
            password: hashedPassword
        })
        return this.userRepository.save(user)
    }
    findAll(): Promise<User[]> {
        return this.userRepository.find()
    }
    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) throw new NotFoundException('User not found')
        return user
    }
    async update(id: string, dto: UpdateUserDTO): Promise<User> {
        const user = await this.findOne(id)
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10)
        }
        Object.assign(user, dto)
        return this.userRepository.save(user)
    }
    async remove(id: string): Promise<void> {
        const user = await this.findOne(id)
        await this.userRepository.remove(user)
    }
}
