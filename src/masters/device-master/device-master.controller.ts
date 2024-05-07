import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeviceMaster, UpdateDeviceStatusDto } from './device-master.entity';
import { DeviceMasterService } from './device-master.service';
import { AuthenticationGuard } from 'src/auth/guards/Authentication.guard';

@Controller('device-master')
@UseGuards(AuthenticationGuard)
export class DeviceMasterController {
  constructor(private service: DeviceMasterService) {}

  @Get('GetAllData')
  async getAllData() {
    return await this.service.getAllData();
  }

  @Get('GetDataById/:id')
  async getDataById(@Param('id') id) {
    return await this.service.getDataById(id);
  }

  @Post('postData')
  async saveData(@Body() body: DeviceMaster) {
    return this.service.saveData(body);
  }

  @Put('updateDeviceStatus')
  async updateDeviceStatus(@Body() body: UpdateDeviceStatusDto) {
    return this.service.updateDeviceStatus(body);
  }
}
