import { UserRole } from "src/entities/user.entity";

export class UpdateUserDTO {
    password: string
    role?: UserRole
    task_id?: string
}