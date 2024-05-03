import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionLogger } from './exception-logger.entity';
import { ExceptionLoggerService } from './exception-logger.service';

@Controller('exception-logger')
@ApiTags('utils')
export class ExceptionLoggerController {
  constructor(private service: ExceptionLoggerService) {}

  @Get('GetAllData')
  async getAllData() {
    return await this.service.getAllData();
  }

  @Get('GetDataById')
  async getDataById(@Param('id') id) {
    return await this.service.getDataById(id);
  }

  @Post('postData')
  async saveData(@Body() body: ExceptionLogger) {
    return this.service.saveData(body);
  }
}
