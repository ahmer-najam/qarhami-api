import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './exception/app-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionLoggerService } from './utils/exception-logger/exception-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const myLoggerService = app.get(ExceptionLoggerService);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Qarhami Application')
    .setDescription('Qarhami API')
    .setVersion('v1')
    .addTag('app')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new AppExceptionFilter(myLoggerService));

  await app.listen(3600);
}
bootstrap();
