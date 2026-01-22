import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Task, task => task.comments, { onDelete: 'CASCADE' })
    task: Task;

    @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
    user: User;

    @Column({ length: 1000 })
    content: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
