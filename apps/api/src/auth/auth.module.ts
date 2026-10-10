import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../database/entities/usuario.entity.js';
import { AuthGuard } from './auth.guard.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { PasswordService } from './password.service.js';
import { RolesGuard } from './roles.guard.js';
import { TokenService } from './token.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, TokenService, AuthGuard, RolesGuard],
  exports: [TypeOrmModule, AuthGuard, RolesGuard, TokenService],
})
export class AuthModule {}
