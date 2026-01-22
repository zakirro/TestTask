import {
    Body,
    Controller,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../auth/dto/register.dto';
import type { Response, Request } from 'express';
import { LoginDto } from '../auth/dto/login.dto'
import { JwtAuthGuard } from './guard/jwt-access.guard'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken, user } = await this.authService.register(dto);

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { accessToken, user, refreshToken };
    }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken, user } = await this.authService.login(dto);

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { accessToken, user, refreshToken };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const user = req.user!;
        await this.authService.logout(user.id);
        res.clearCookie('refresh_token');
        return { message: 'Logged out successfully' };
    }

    @Post('refresh')
    async refreshTokens(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshTokens(dto.refreshToken);
    }
}
