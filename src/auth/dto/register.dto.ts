import { UserRole } from '../../entities/user.entity'

export class RegisterDto {
    password: string;
    role?: UserRole;
    task_id?: string;
}
