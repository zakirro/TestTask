import { UserRole } from '../../entities/user.entity';

export interface JwtPayload {
    id: number;
    email: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}
