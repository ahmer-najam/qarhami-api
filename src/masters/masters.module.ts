import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentType } from './attachment-type/attachment-type.entity';
import { AttachmentTypeController } from './attachment-type/attachment-type.controller';
import { AttachmentTypeService } from './attachment-type/attachment-type.service';
import { Serial } from 'src/serial/serial.entity';
import { SerialService } from 'src/serial/serial.service';
import { DeviceMaster } from './device-master/device-master.entity';
import { DeviceMasterController } from './device-master/device-master.controller';
import { DeviceMasterService } from './device-master/device-master.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttachmentType, Serial, DeviceMaster])],
  controllers: [AttachmentTypeController, DeviceMasterController],
  providers: [AttachmentTypeService, SerialService, DeviceMasterService],
})
export class MastersModule {}
