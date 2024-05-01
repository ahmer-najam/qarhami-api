import { CityService } from './city.service';
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { City } from './city.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('city')
@ApiTags('test')
export class CityController {
  constructor(private cityService: CityService) {}

  @Get('getAllData')
  async getAllCities() {
    return await this.cityService.getAllCities();
  }

  @Get('getDataById/:id')
  async getCityById(@Param('id') id) {
    return await this.cityService.getCityById(id);
  }

  @Get('getCityByNumber/:id')
  async getCityByNumber(@Param('id') id) {
    return await this.cityService.getCityByNumber(id);
  }

  @Post('postData')
  async saveData(@Body() body: City) {
    return this.cityService.saveData(body);
  }
}
