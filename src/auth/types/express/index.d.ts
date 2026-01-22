import { UserRole } from 'src/entities/user.entity';

declare module 'express' {
    export interface Request {
        user?: {
            id: string;
            role: UserRole;
        };
    }
}
