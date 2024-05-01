import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [],
})
export class UtilsModule {}
