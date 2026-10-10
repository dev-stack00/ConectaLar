import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../database/entities/usuario.entity.js';
import { UsuarioTipo, usuarioTiposPublicos } from '../domain/usuario-tipo.js';
import { PasswordService } from './password.service.js';
import { TokenService } from './token.service.js';

interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
  tipo: UsuarioTipo;
  telefone?: string | null;
}

interface LoginRequest {
  email: string;
  senha: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarios: Repository<UsuarioEntity>,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async cadastro(body: unknown) {
    const cadastro = parseCadastro(body);
    const email = normalizarEmail(cadastro.email);
    const existing = await this.usuarios.findOne({ where: { email } });
    if (existing !== null) {
      throw new ConflictException({
        code: 'CONTA_NAO_CRIADA',
        message: 'Nao foi possivel criar a conta com estes dados.',
      });
    }

    const usuario = this.usuarios.create({
      nome: cadastro.nome.trim(),
      email,
      telefone: cadastro.telefone?.trim() || null,
      tipo: cadastro.tipo,
      senhaHash: await this.passwordService.hash(cadastro.senha),
      ativo: true,
    });

    const saved = await this.usuarios.save(usuario);
    return this.authResponse(saved);
  }

  async login(body: unknown) {
    const login = parseLogin(body);
    const email = normalizarEmail(login.email);
    const usuario = await this.usuarios
      .createQueryBuilder('usuario')
      .addSelect('usuario.senhaHash')
      .where('usuario.email = :email', { email })
      .andWhere('usuario.ativo = :ativo', { ativo: true })
      .getOne();

    if (
      usuario === null ||
      !(await this.passwordService.verify(login.senha, usuario.senhaHash))
    ) {
      throw new UnauthorizedException({
        code: 'CREDENCIAIS_INVALIDAS',
        message: 'E-mail ou senha invalidos.',
      });
    }

    return this.authResponse(usuario);
  }

  private authResponse(usuario: UsuarioEntity) {
    return {
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        tipo: usuario.tipo,
      },
      token: this.tokenService.createAccessToken(usuario),
    };
  }
}

function parseCadastro(body: unknown): CadastroRequest {
  const value = objectBody(body);
  const nome = stringField(value, 'nome');
  const email = stringField(value, 'email');
  const senha = stringField(value, 'senha');
  const tipo = stringField(value, 'tipo');
  const telefone = optionalStringField(value, 'telefone');

  if (nome.trim().length < 3 || nome.trim().length > 140) {
    throw badRequest('NOME_INVALIDO');
  }

  if (!emailValido(email)) {
    throw badRequest('EMAIL_INVALIDO');
  }

  if (senha.length < 8 || senha.length > 128) {
    throw badRequest('SENHA_INVALIDA');
  }

  if (!usuarioTiposPublicos.has(tipo)) {
    throw badRequest('TIPO_INVALIDO');
  }

  return {
    nome,
    email,
    senha,
    tipo: tipo as UsuarioTipo,
    telefone,
  };
}

function parseLogin(body: unknown): LoginRequest {
  const value = objectBody(body);
  const email = stringField(value, 'email');
  const senha = stringField(value, 'senha');

  if (!emailValido(email) || senha.length === 0) {
    throw new UnauthorizedException({
      code: 'CREDENCIAIS_INVALIDAS',
      message: 'E-mail ou senha invalidos.',
    });
  }

  return { email, senha };
}

function objectBody(body: unknown): Record<string, unknown> {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw badRequest('CORPO_INVALIDO');
  }

  return body as Record<string, unknown>;
}

function stringField(value: Record<string, unknown>, key: string): string {
  const field = value[key];
  if (typeof field !== 'string' || field.trim().length === 0) {
    throw badRequest('CAMPO_OBRIGATORIO');
  }

  return field;
}

function optionalStringField(
  value: Record<string, unknown>,
  key: string,
): string | null {
  const field = value[key];
  if (field === undefined || field === null || field === '') {
    return null;
  }

  if (typeof field !== 'string') {
    throw badRequest('CAMPO_INVALIDO');
  }

  return field;
}

function normalizarEmail(email: string): string {
  return email.trim().toLowerCase();
}

function emailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function badRequest(code: string): BadRequestException {
  return new BadRequestException({
    code,
    message: 'Dados invalidos.',
  });
}
