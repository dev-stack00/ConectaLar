# Progresso do ConectaLar

## Etapa 1 — Fundação do backend

**Estado:** validada com Node.js 22.23.3 e npm 10.9.9.

**Entregue nesta etapa:**

- Área independente `apps/api` com estrutura NestJS e versões diretas fixadas.
- Validação de `NODE_ENV`, `HOST` e `PORT` sem incluir os valores fornecidos em mensagens de erro.
- Endpoint `GET /health` sem detalhes de ambiente ou dependências.
- Filtro global com respostas genéricas e logs sem mensagem, stack trace, URL ou corpo da requisição.
- `.env.example` apenas com configurações não secretas.
- Testes básicos para saúde e validação de configuração.
- Exclusões locais e de dependências adicionadas ao `.gitignore`.

**Evidências e limitações:**

- `npm ci --ignore-scripts` reproduziu a instalação a partir de `apps/api/package-lock.json` (101 pacotes). O registry alternativo e `NODE_USE_SYSTEM_CA=1` foram usados apenas no processo de instalação por limitações de certificado/rede; a validação TLS permaneceu ativa e scripts de instalação de terceiros não foram executados.
- `npm run typecheck`, `npm run build`, `npm test` (2 testes) e `npm ls --depth=0` passaram após a instalação limpa.
- O servidor iniciou em loopback e `GET /health` respondeu `{"status":"ok"}`.
- Inspeções heurísticas de caminhos, marcadores de chave privada/tokens e atribuições de credenciais não localizaram candidatos no conteúdo preparado para versionamento.
- O snapshot Git está na branch `main`; ainda não há commit porque nome e e-mail de autoria não estão configurados.
- A validação cobre a API inicial e não conecta ao MySQL nem executa o SQL legado.

**Etapa 1 concluída.**

## Etapa 2 — Banco e contratos

**Estado:** em andamento; inventário legado, entidades candidatas, convenções de contrato, rastreabilidade inicial e configuração TypeORM preparados. O usuário escolheu login por e-mail ou telefone, aprovou o fluxo recomendado de recuperação e definiu uma conta administrativa principal que cria contas individuais. O modelo executável ainda precisa dos detalhes em aberto de P01/P02/P11/P15 e do escopo da primeira entrega.

**Próximo passo:** completar normalização/verificação dos contatos, expiração e concorrência de sessões, permissões e convite administrativo; informar o escopo da primeira entrega. O usuário criará um MySQL local. Após os detalhes, fechar entidades e índices, criar migrations revisáveis e dados sintéticos isolados; não aplicar ao SQL legado.
