import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Request, Response } from 'express';
import { ExceptionLoggerService } from 'src/utils/exception-logger/exception-logger.service';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  // constructor(private httpAdapterHost: HttpAdapterHost) {}
  constructor(private loggerSerice: ExceptionLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let request = ctx.getRequest<Request>();
    let response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = 'Internet Server Error';

    // const { httpAdapter } = this.httpAdapterHost;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.message;
    }

    const body: any = {
      statusCode: status.toString(),
      createdAt: new Date(),
      createdBy: 'ADMIN',
      updatedAt: new Date(),
      updatedBy: 'ADMIN',
      message: msg,
      errorDetails: JSON.stringify(exception['response']),
      source: 'Qarhami API Handler v1.0',
      url: request.url,
      id: null,
    };

    delete body.id;
    this.writeHttpLog(body);
    response.status(status).send(body);
  }

  private async writeHttpLog(data: any) {
    const LOGS_DIR = join(__dirname, `${Date.now()}-logs.json`);

    try {
      await this.loggerSerice.saveData(data);
      await writeFile(LOGS_DIR, JSON.stringify(data));
    } catch (error) {
      return;
    }
  }
}
