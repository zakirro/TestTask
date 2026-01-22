import { UserRole } from '../../entities/user.entity'

export class LoginDto {
    id: string
    password: string;
    role?: UserRole;
    task_id?: string;
}