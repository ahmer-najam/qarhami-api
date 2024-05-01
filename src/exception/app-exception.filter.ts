import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let request = ctx.getRequest();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = 'Internet Server Error';
    const { httpAdapter } = this.httpAdapterHost;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.message;
    }

    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: msg,
      errorDetails: JSON.stringify(exception['response']),
      source: 'MBE ERP Exception Handler',
      url: request.url,
    };

    this.writeHttpLog(body);
    httpAdapter.reply(ctx.getResponse(), body, status);
  }

  private async writeHttpLog(data: Record<string, any>) {
    const LOGS_DIR = join(__dirname, `${Date.now()}-logs.json`);
    try {
      await writeFile(LOGS_DIR, JSON.stringify(data));
    } catch (error) {
      return;
    }
  }
}
