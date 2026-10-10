# Arquitetura e Continuidade

Leia este guia antes de mudanças estruturais, integrações, modelagem, API ou retomada de desenvolvimento.

## Estado Real Registrado

Documentos em `docs/` indicam:

- A fundação da API nova vive em `apps/api`, com NestJS/TypeScript.
- O backend PHP em `backend/` é legado e deve ser preservado, não apagado nem migrado automaticamente.
- A API NestJS tem apenas fundação: `GET /health`, validação de `NODE_ENV`/`HOST`/`PORT`, filtro global de exceções seguro e configuração TypeORM CLI.
- A API ainda não tem autenticação, módulos de negócio, entidades, migrations nem conexão ativa ao MySQL em runtime.
- TypeORM + `mysql2` foi aprovado para a camada MySQL da API nova; `synchronize: false` e `migrationsRun: false` devem permanecer.
- O Flutter tem estrutura em `lib/app`, `lib/models`, `lib/screens`, `lib/services`, `lib/widgets` e `lib/utils`.
- A Home e parte do fluxo de busca/perfil podem usar dados mockados; diferencie mock de integração real.

## Divergência Técnica Importante

Os DOCX mencionam Flutter/Dart, API REST JSON, backend PHP, MySQL e XAMPP/Apache como decisões técnicas históricas. `docs/decisoes.md` registra que o prompt mestre atual prevalece para a nova API: Node.js/TypeScript/NestJS/MySQL substitui PHP/XAMPP como caminho novo, preservando PHP como legado.

Ao encontrar divergência:

1. Registre a fonte antiga e a decisão mais recente.
2. Não apague código legado sem autorização.
3. Não misture endpoints PHP com novos contratos NestJS sem decisão explícita.
4. Não aplicar migrations ao banco legado.

## Continuidade

- Não recriar o app do zero.
- Reutilizar modelos, rotas, serviços, widgets, validadores e tema existentes.
- Antes de editar, inspecionar código relevante, docs e status local.
- Preservar alterações locais e evitar operações Git destrutivas.
- Não fazer commit, push, alterar remotos ou limpar branches sem autorização.
- Separar: implementado, parcial, placeholder, simulado, testado e pendente.

## Testes e Comandos

Para Flutter, quando o SDK estiver disponível:

```sh
dart format <arquivos alterados>
flutter analyze
flutter test
```

Para API NestJS, quando Node/npm estiverem disponíveis em `apps/api`:

```sh
npm ci
npm run typecheck
npm run build
npm test
```

Relate comandos reais e resultados reais. Se um comando falhar por ambiente, diga isso e não declare validação.

## Escopo Financeiro e Publicação

O orçamento registrado é limitado e o desenvolvimento deve começar localmente, sem custos recorrentes assumidos. A equipe não dispõe de Mac; iOS e publicação exigem decisão posterior. Não configurar produção, lojas, cobrança, serviços pagos ou hospedagem definitiva sem autorização.
