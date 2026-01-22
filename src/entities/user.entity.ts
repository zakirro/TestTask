import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import { Task } from './task.entity';
import { Comment } from './comment.entity';

export enum UserRole {
    AUTHOR = 'author',
    USER = 'user'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    password: string

    @Column()
    email: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({ type: 'uuid', nullable: true })
    task_id: string;

    @Column({ nullable: true, type: 'text' })
    refreshToken?: string | null;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

}
