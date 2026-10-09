import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

interface SafeHttpResponse {
  status(code: number): this;
  json(body: { statusCode: number; message: string }): void;
}

@Catch()
export class SafeExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<SafeHttpResponse>();
    const requestedStatus =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const statusCode =
      requestedStatus >= 400 && requestedStatus <= 599 ? requestedStatus : 500;
    const errorType =
      exception instanceof HttpException
        ? 'HttpException'
        : exception instanceof Error
          ? 'Error'
          : 'UnknownException';

    // Deliberately omit exception messages, stacks, URLs, headers, and bodies.
    console.error(
      JSON.stringify({
        level: 'error',
        event: 'http_exception',
        statusCode,
        errorType,
      }),
    );

    response.status(statusCode).json({
      statusCode,
      message:
        statusCode >= 500
          ? 'Internal server error'
          : 'Request could not be processed',
    });
  }
}
