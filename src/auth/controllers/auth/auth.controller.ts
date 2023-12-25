import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { SignInDto } from 'src/auth/dtos/signin.dto';
import { AuthService } from 'src/auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
