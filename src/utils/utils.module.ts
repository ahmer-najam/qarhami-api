import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';
import { ExceptionLogger } from './exception-logger/exception-logger.entity';
import { ExceptionLoggerController } from './exception-logger/exception-logger.controller';
import { ExceptionLoggerService } from './exception-logger/exception-logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionLogger])],
  controllers: [UploadController, ExceptionLoggerController],
  providers: [ExceptionLoggerService],
})
export class UtilsModule {}
