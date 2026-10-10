import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cadastro')
  cadastro(@Body() body: unknown) {
    return this.authService.cadastro(body);
  }

  @Post('login')
  login(@Body() body: unknown) {
    return this.authService.login(body);
  }
}
