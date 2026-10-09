import { createApp } from './app.factory.js';
import { ConfigurationError, loadConfig } from './config/environment.js';

async function bootstrap(): Promise<void> {
  try {
    const config = loadConfig();
    const app = await createApp();
    await app.listen(config.port, config.host);
    console.info(
      JSON.stringify({
        level: 'info',
        event: 'api_started',
        host: config.host,
        port: config.port,
      }),
    );
  } catch (error: unknown) {
    const code =
      error instanceof ConfigurationError ? error.code : 'STARTUP_FAILURE';
    console.error(
      JSON.stringify({
        level: 'error',
        event: 'api_startup_failed',
        code,
      }),
    );
    process.exitCode = 1;
  }
}

void bootstrap();
