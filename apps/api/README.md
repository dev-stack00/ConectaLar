# ConectaLar API foundation

This is the new NestJS API workspace. The existing PHP backend remains legacy code and is not called by this foundation. The first MySQL-backed module is authentication, enabled only when the required database and token environment variables are present.

## Runtime configuration

Use Node.js 22.13 or newer in the 22.x line, or 24.15 or newer. Install dependencies from this directory, then run `npm run typecheck`, `npm run build`, `npm test`, and `npm start`. The API reads environment variables from the process and does not load a `.env` file. Supply deployment values through the local shell or a secret manager.

| Variable | Default | Validation |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development`, `test`, or `production` |
| `HOST` | `127.0.0.1` | IP address or DNS hostname |
| `PORT` | `3000` | Integer from 1 through 65535 |
| `DB_HOST` | none | Required to enable MySQL-backed routes |
| `DB_PORT` | `3306` | Integer from 1 through 65535 |
| `DB_USER` | none | Required to enable MySQL-backed routes |
| `DB_PASSWORD` | empty string | Allowed empty only for local development |
| `DB_NAME` | none | Required to enable MySQL-backed routes |
| `AUTH_TOKEN_SECRET` | none | Required to enable auth routes; minimum 32 characters |

The health check is `GET /health` and returns only `{ "status": "ok" }`. It does not report dependency, database, version, or environment details.

The OpenAPI contract for the health and auth routes is in `openapi.yaml`. Auth routes are mounted only when MySQL and `AUTH_TOKEN_SECRET` are configured before process startup.

## Logging and errors

Request bodies and headers are not logged. The global exception filter returns a generic response and emits only a structured event, HTTP status, and broad exception type; it omits exception messages, stacks, URLs, and request data. Add request logging only with an explicit redaction and retention policy.

The API currently has no external service, CORS, upload, or service-flow modules. The app module imports TypeORM and auth only when runtime configuration is complete, so the health endpoint remains independent of MySQL.

## Database foundation

The approved persistence stack is `@nestjs/typeorm` 12.0.2, TypeORM 1.1.2, and `mysql2` 3.24.5. `src/database/data-source.ts` is the explicit TypeORM CLI data source. It requires `DB_HOST`, `DB_USER`, and `DB_NAME`; `DB_PORT` defaults to 3306 and `DB_PASSWORD` defaults to an empty string for local development. It reads process environment variables only and does not load `.env` files.

Schema synchronization and automatic migrations are disabled (`synchronize: false`, `migrationsRun: false`). The initial migration creates only the `usuarios` table needed for RF001/RF002 groundwork. Do not point a migration command at the legacy database.

The `.env.example` values are placeholders, not usable credentials. Supply local test database values only in the current PowerShell session or an ignored local file after a local MySQL database has been set up.

For the local portable MySQL setup used during development:

```powershell
$env:DB_HOST='127.0.0.1'
$env:DB_PORT='3307'
$env:DB_USER='root'
Remove-Item Env:DB_PASSWORD -ErrorAction SilentlyContinue
$env:DB_NAME='conectalar_dev'
$env:AUTH_TOKEN_SECRET='local-dev-secret-change-before-production-123456'
npm run db:migration:run
npm start
```

Authentication routes:

- `POST /auth/cadastro`
- `POST /auth/login`

Passwords are stored as `scrypt` hashes. Responses never include `senha_hash`.

Professional routes:

- `GET /profissionais`
- `GET /profissionais?termo=eletricista&bairro=jardim`
- `GET /profissionais/:id`
- `GET /profissionais/me` with `Authorization: Bearer <token>` for `profissional` or `empresa`
- `PUT /profissionais/me` with `Authorization: Bearer <token>` for `profissional` or `empresa`
- `PATCH /profissionais/:id/verificacao` with `Authorization: Bearer <token>` for `administrador`

Professional public responses do not expose e-mail, phone, address, documents, or password hashes. The `verificado` seal can only be changed through the administrative route; professionals cannot approve their own seal.
