import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './exception/app-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('MBE ERP Application')
    .setDescription('ERP API')
    .setVersion('v1')
    .addTag('erp')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new AppExceptionFilter(httpAdapterHost));

  await app.listen(3600);
}
bootstrap();
