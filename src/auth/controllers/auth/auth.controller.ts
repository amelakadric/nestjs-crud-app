import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Req,
  Request,
  Get,
} from '@nestjs/common';
import { LogInDto } from 'src/auth/dtos/login.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { userInfo } from 'os';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LogInDto,
  ) {
    const jwt = await this.authService.login(req.user);
    console.log(jwt);

    res.cookie('jwt', jwt, { httpOnly: true });

    return req.user;
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', '', { expires: new Date(Date.now()) });
  }
}
