import { UserRole } from '../../entities/user.entity'

export class RegisterDto {
    id: string
    password: string;
    role?: UserRole;
    task_id?: string;
}
