import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeviceMaster } from './device-master.entity';
import { DeviceMasterService } from './device-master.service';

@Controller('device-master')
@ApiTags('masters')
export class DeviceMasterController {
  constructor(private service: DeviceMasterService) {}

  @Get('GetAllData')
  async getAllData() {
    return await this.service.getAllData();
  }

  @Get('GetDataById')
  async getDataById(@Param('id') id) {
    return await this.service.getDataById(id);
  }

  @Post('postData')
  async saveData(@Body() body: DeviceMaster) {
    return this.service.saveData(body);
  }
}
