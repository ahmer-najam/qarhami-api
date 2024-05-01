import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttachmentType } from './attachment-type.entity';
import { AttachmentTypeService } from './attachment-type.service';

@Controller('attachment-type')
@ApiTags('masters')
export class AttachmentTypeController {
  constructor(private service: AttachmentTypeService) {}

  @Get('GetAllData')
  async getAllData() {
    return await this.service.getAllData();
  }

  @Get('GetDataById')
  async getDataById(@Param('id') id) {
    return await this.service.getDataById(id);
  }

  @Post('postData')
  async saveData(@Body() body: AttachmentType) {
    return this.service.saveData(body);
  }
}
