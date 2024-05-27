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
      'http://localhost:5173',
      'http://localhost:4173',
    ],
    methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
  });

  await app.listen(3200);
}
bootstrap();
