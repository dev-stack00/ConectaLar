# ConectaLar API foundation

This is the new NestJS API workspace. The existing PHP backend remains legacy code and is not called by this foundation. No database connection or business routes are configured in this stage.

## Runtime configuration

Use Node.js 22.13 or newer in the 22.x line, or 24.15 or newer. Install dependencies from this directory, then run `npm run typecheck`, `npm run build`, `npm test`, and `npm start`. The checked-in `.env.example` documents non-secret defaults; the API reads environment variables from the process and does not load a `.env` file. Supply deployment values through the local shell or a secret manager.

| Variable | Default | Validation |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development`, `test`, or `production` |
| `HOST` | `127.0.0.1` | IP address or DNS hostname |
| `PORT` | `3000` | Integer from 1 through 65535 |

The health check is `GET /health` and returns only `{ "status": "ok" }`. It does not report dependency, database, version, or environment details.

The initial OpenAPI contract for the health route and its generic error envelope is in `openapi.yaml`. It intentionally contains no business routes yet.

## Logging and errors

Request bodies and headers are not logged. The global exception filter returns a generic response and emits only a structured event, HTTP status, and broad exception type; it omits exception messages, stacks, URLs, and request data. Add request logging only with an explicit redaction and retention policy.

The API currently has no authentication, active database connection, external service, CORS, upload, or business modules. The app module does not import TypeORM, so the health endpoint remains independent of MySQL.

## Database foundation

The approved persistence stack is `@nestjs/typeorm` 12.0.2, TypeORM 1.1.2, and `mysql2` 3.24.5. `src/database/data-source.ts` is the explicit TypeORM CLI data source. It requires `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`; `DB_PORT` defaults to 3306. It reads process environment variables only and does not load `.env` files.

Schema synchronization and automatic migrations are disabled (`synchronize: false`, `migrationsRun: false`). The current data source is not imported by the API at startup. There are no product entities or migrations yet: those await the P01–P18 scope and policy decisions recorded in `../../docs/pendencias.md`. Do not point a migration command at the legacy database.

The `.env.example` values are placeholders, not usable credentials. Supply local test database values only in the current PowerShell session or an ignored local file after a local MySQL database has been set up. No migration run command is provided until there is a reviewed initial migration and an isolated test database.
