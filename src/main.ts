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
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Backend Generator',
    customfavIcon:
      'https://th.bing.com/th/id/R.91a0dd47109248077d63fcf173fa230c?rik=F4DkAMYtPhsnFQ&pid=ImgRaw&r=0',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });
  app.useGlobalFilters(new AppExceptionFilter(myLoggerService));

  await app.listen(3600);
}
bootstrap();
