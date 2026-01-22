import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            email: dto.email,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        return this.generateTokens(user);
    }

    private async generateTokens(user: User) {
        const payload = {
            id: user.id,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(payload, {
            secret:
                process.env.ACCESS_SECRET ||
                'default-access-secret-key-change-in-production',
            expiresIn: '6h',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret:
                process.env.REFRESH_SECRET ||
                'default-refresh-secret-key-change-in-production',
            expiresIn: '14d',
        });

        user.refreshToken = refreshToken;
        await this.userRepository.save(user);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                role: user.role,
            },
        };
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret:
                    process.env.REFRESH_SECRET ||
                    'default-refresh-secret-key-change-in-production',
            });

            const user = await this.userRepository.findOne({
                where: { id: payload.id },
            });

            if (!user || user.refreshToken !== refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            } return this.generateTokens(user);
        } catch {
            throw new UnauthorizedException('Refresh token expired or invalid');
        }
    }

    async login(dto: LoginDto) {
        const user = await this.userRepository.findOne({ where: { email: dto.email } });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        return this.generateTokens(user);
    }

    async logout(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.refreshToken = null;
        await this.userRepository.save(user);
        return { message: 'Logged out successfully' };
    }
}

