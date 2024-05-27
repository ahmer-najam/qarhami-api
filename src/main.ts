import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AppExceptionFilter } from './exception/app-exception.filter';
import { ExceptionLoggerService } from './utils/exception-logger/exception-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const myLoggerService = app.get(ExceptionLoggerService);
  app.useGlobalFilters(new AppExceptionFilter(myLoggerService));
  app.enableCors({
    origin: [
      'https://ahami-app.vercel.app/',
      'https://qarhami-pwa-app.vercel.app',
      'http://localhost:5173',
      'http://localhost:4173',
    ],
    methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
    credentials: true,
    allowedHeaders: '*',
  });

  await app.listen(3200);
}
bootstrap();
