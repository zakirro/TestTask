import { UserRole } from "src/entities/user.entity";

export class CreateUserDTO {
    password: string
    role?: UserRole
    task_id?: string
}