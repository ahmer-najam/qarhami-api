import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { Manufacturers } from './manufacturers.entity';
import { ManufacturersService } from './manufacturers.service';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private service: ManufacturersService) {}

  @Get('getAllData')
  async getAllData() {
    return await this.service.getAllData();
  }

  @Get('getDataById/:id')
  async getDataById(@Param('id') id) {
    return await this.service.getDataById(id);
  }

  @Post('postData')
  async saveData(@Body() body: Manufacturers) {
    return this.service.saveData(body);
  }
}
