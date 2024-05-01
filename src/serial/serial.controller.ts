import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { Serial } from './serial.entity';
import { ApiTags } from '@nestjs/swagger';
import { SerialService } from './serial.service';

@Controller('serial')
@ApiTags('general')
export class SerialController {
  constructor(private serialService: SerialService) {}

  @Get('getNewSerial/:key')
  async getNewSerial(@Param('key') key) {
    return await this.serialService.getNewSerial(key);
  }
}
