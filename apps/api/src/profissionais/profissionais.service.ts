import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AuthenticatedUser } from '../auth/authenticated-user.js';
import { CategoriaEntity } from '../database/entities/categoria.entity.js';
import { ProfissionalPerfilEntity } from '../database/entities/profissional-perfil.entity.js';
import { ProfissionalServicoEntity } from '../database/entities/profissional-servico.entity.js';
import { UsuarioEntity } from '../database/entities/usuario.entity.js';
import { UsuarioTipo } from '../domain/usuario-tipo.js';

interface ProfissionalServicoInput {
  readonly nome: string;
  readonly categoriaId?: number | null;
  readonly precoInicial?: number | null;
}

interface UpsertPerfilInput {
  readonly descricao: string;
  readonly bairro: string;
  readonly precoInicial?: number | null;
  readonly servicos: readonly ProfissionalServicoInput[];
}

interface ProfissionaisFiltros {
  readonly termo: string | null;
  readonly bairro: string | null;
  readonly categoriaId: number | null;
}

@Injectable()
export class ProfissionaisService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categorias: Repository<CategoriaEntity>,
    @InjectRepository(ProfissionalPerfilEntity)
    private readonly perfis: Repository<ProfissionalPerfilEntity>,
    @InjectRepository(ProfissionalServicoEntity)
    private readonly servicos: Repository<ProfissionalServicoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarios: Repository<UsuarioEntity>,
  ) {}

  async listar(query: Record<string, unknown>) {
    const termo = optionalText(query.termo, 80);
    const bairro = optionalText(query.bairro, 80);
    const categoriaId = optionalId(query.categoriaId);

    const builder = this.perfis
      .createQueryBuilder('perfil')
      .leftJoinAndSelect('perfil.usuario', 'usuario')
      .leftJoinAndSelect(
        'perfil.servicos',
        'servico',
        'servico.ativo = :ativo',
        { ativo: true },
      )
      .leftJoinAndSelect('servico.categoria', 'categoria')
      .where('perfil.ativo = :ativo', { ativo: true })
      .andWhere('usuario.ativo = :ativo', { ativo: true })
      .andWhere('usuario.tipo IN (:...tipos)', {
        tipos: [UsuarioTipo.Profissional, UsuarioTipo.Empresa],
      })
      .orderBy('perfil.verificado', 'DESC')
      .addOrderBy('usuario.nome', 'ASC');

    const perfis = await builder.getMany();
    return {
      profissionais: perfis
        .filter((perfil) =>
          correspondeFiltros(perfil, { termo, bairro, categoriaId }),
        )
        .map(perfilPublico),
    };
  }

  async obter(id: number) {
    const perfil = await this.perfis.findOne({
      where: { id, ativo: true },
      relations: { usuario: true, servicos: { categoria: true } },
    });
    if (
      perfil === null ||
      !perfil.usuario.ativo ||
      ![UsuarioTipo.Profissional, UsuarioTipo.Empresa].includes(
        perfil.usuario.tipo,
      )
    ) {
      throw new NotFoundException({
        code: 'PROFISSIONAL_NAO_ENCONTRADO',
        message: 'Profissional nao encontrado.',
      });
    }

    return { profissional: perfilPublico(perfil) };
  }

  async meuPerfil(user: AuthenticatedUser) {
    const perfil = await this.perfis.findOne({
      where: { usuarioId: user.id },
      relations: { usuario: true, servicos: { categoria: true } },
    });

    return { profissional: perfil === null ? null : perfilPublico(perfil) };
  }

  async salvarMeuPerfil(user: AuthenticatedUser, body: unknown) {
    const input = parseUpsertPerfil(body);
    const usuario = await this.usuarios.findOne({
      where: {
        id: user.id,
        tipo: In([UsuarioTipo.Profissional, UsuarioTipo.Empresa]),
        ativo: true,
      },
    });
    if (usuario === null) {
      throw new BadRequestException({
        code: 'USUARIO_NAO_ELEGIVEL',
        message: 'Apenas profissionais ou empresas podem publicar perfil.',
      });
    }

    const categoriaIds = [
      ...new Set(
        input.servicos
          .map((servico) => servico.categoriaId)
          .filter((id): id is number => id !== null && id !== undefined),
      ),
    ];
    if (categoriaIds.length > 0) {
      const categoriasAtivas = await this.categorias.find({
        where: { id: In(categoriaIds), ativo: true },
      });
      if (categoriasAtivas.length !== categoriaIds.length) {
        throw badRequest('CATEGORIA_INVALIDA');
      }
    }

    let perfil = await this.perfis.findOne({ where: { usuarioId: user.id } });
    perfil ??= this.perfis.create({ usuarioId: user.id, verificado: false });
    perfil.usuario = usuario;
    perfil.descricao = input.descricao;
    perfil.bairro = input.bairro;
    perfil.precoInicial = decimalOrNull(input.precoInicial);
    perfil.ativo = true;

    const saved = await this.perfis.save(perfil);
    await this.servicos.delete({ profissionalId: saved.id });
    if (input.servicos.length > 0) {
      await this.servicos.save(
        input.servicos.map((servico) =>
          this.servicos.create({
            profissionalId: saved.id,
            categoriaId: servico.categoriaId ?? null,
            nome: servico.nome,
            precoInicial: decimalOrNull(servico.precoInicial),
            ativo: true,
          }),
        ),
      );
    }

    const reloaded = await this.perfis.findOne({
      where: { id: saved.id },
      relations: { usuario: true, servicos: { categoria: true } },
    });
    if (reloaded === null) {
      throw new Error('Saved professional profile could not be reloaded.');
    }

    return { profissional: perfilPublico(reloaded) };
  }

  async definirVerificacao(id: number, body: unknown) {
    const value = objectBody(body);
    if (typeof value.verificado !== 'boolean') {
      throw badRequest('VERIFICACAO_INVALIDA');
    }

    const perfil = await this.perfis.findOne({
      where: { id },
      relations: { usuario: true, servicos: { categoria: true } },
    });
    if (perfil === null) {
      throw new NotFoundException({
        code: 'PROFISSIONAL_NAO_ENCONTRADO',
        message: 'Profissional nao encontrado.',
      });
    }

    perfil.verificado = value.verificado;
    const saved = await this.perfis.save(perfil);
    saved.usuario = perfil.usuario;
    saved.servicos = perfil.servicos;
    return { profissional: perfilPublico(saved) };
  }
}

function perfilPublico(perfil: ProfissionalPerfilEntity) {
  const servicos = (perfil.servicos ?? [])
    .filter((servico) => servico.ativo)
    .map((servico) => ({
      id: servico.id,
      nome: servico.nome,
      categoria:
        servico.categoria === null || servico.categoria === undefined
          ? null
          : {
              id: servico.categoria.id,
              nome: servico.categoria.nome,
            },
      precoInicial: numberOrNull(servico.precoInicial),
    }));

  return {
    id: perfil.id,
    usuarioId: perfil.usuarioId,
    nome: perfil.usuario.nome,
    tipo: perfil.usuario.tipo,
    descricao: perfil.descricao,
    bairro: perfil.bairro,
    precoInicial: numberOrNull(perfil.precoInicial),
    verificado: perfil.verificado,
    servicos,
  };
}

function correspondeFiltros(
  perfil: ProfissionalPerfilEntity,
  filtros: ProfissionaisFiltros,
): boolean {
  const bairro = normalizar(filtros.bairro);
  if (bairro !== null && !normalizar(perfil.bairro)?.includes(bairro)) {
    return false;
  }

  if (
    filtros.categoriaId !== null &&
    !(perfil.servicos ?? []).some(
      (servico) => servico.categoriaId === filtros.categoriaId,
    )
  ) {
    return false;
  }

  const termo = normalizar(filtros.termo);
  if (termo === null) {
    return true;
  }

  const campos = [
    perfil.usuario.nome,
    perfil.descricao,
    perfil.bairro,
    ...(perfil.servicos ?? []).map((servico) => servico.nome),
    ...(perfil.servicos ?? []).map((servico) => servico.categoria?.nome ?? ''),
  ];

  return campos.some((campo) => normalizar(campo)?.includes(termo));
}

function normalizar(value: string | null): string | null {
  if (value === null) return null;
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function parseUpsertPerfil(body: unknown): UpsertPerfilInput {
  const value = objectBody(body);
  const descricao = textField(value, 'descricao', 20, 280);
  const bairro = textField(value, 'bairro', 2, 120);
  const precoInicial = optionalMoney(value.precoInicial);
  const servicos = parseServicos(value.servicos);

  return { descricao, bairro, precoInicial, servicos };
}

function parseServicos(value: unknown): readonly ProfissionalServicoInput[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > 12) {
    throw badRequest('SERVICOS_INVALIDOS');
  }

  return value.map((item) => {
    const body = objectBody(item);
    return {
      nome: textField(body, 'nome', 2, 90),
      categoriaId: optionalId(body.categoriaId),
      precoInicial: optionalMoney(body.precoInicial),
    };
  });
}

function objectBody(body: unknown): Record<string, unknown> {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw badRequest('CORPO_INVALIDO');
  }

  return body as Record<string, unknown>;
}

function textField(
  value: Record<string, unknown>,
  key: string,
  min: number,
  max: number,
): string {
  const field = value[key];
  if (typeof field !== 'string') {
    throw badRequest('CAMPO_INVALIDO');
  }

  const text = field.trim();
  if (text.length < min || text.length > max) {
    throw badRequest('CAMPO_INVALIDO');
  }

  return text;
}

function optionalText(value: unknown, max: number): string | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') throw badRequest('FILTRO_INVALIDO');
  const text = value.trim();
  if (text.length === 0) return null;
  if (text.length > max) throw badRequest('FILTRO_INVALIDO');
  return text;
}

function optionalId(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value;
  }
  if (typeof value === 'string' && /^[1-9]\d{0,9}$/.test(value)) {
    return Number(value);
  }

  throw badRequest('ID_INVALIDO');
}

function optionalMoney(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw badRequest('PRECO_INVALIDO');
  }

  return Math.round(value * 100) / 100;
}

function decimalOrNull(value: number | null | undefined): string | null {
  return value === null || value === undefined ? null : value.toFixed(2);
}

function numberOrNull(value: string | null): number | null {
  return value === null ? null : Number(value);
}

function badRequest(code: string): BadRequestException {
  return new BadRequestException({
    code,
    message: 'Dados invalidos.',
  });
}
