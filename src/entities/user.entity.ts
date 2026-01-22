import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

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

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date

    @Column({ type: 'uuid', nullable: true })
    task_id: string;
}
