import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AppExceptionFilter } from './exception/app-exception.filter';
import { ExceptionLoggerService } from './utils/exception-logger/exception-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const myLoggerService = app.get(ExceptionLoggerService);
  app.useGlobalFilters(new AppExceptionFilter(myLoggerService));
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
