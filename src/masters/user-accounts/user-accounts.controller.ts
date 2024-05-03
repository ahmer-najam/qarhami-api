import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, UserAccounts } from './user-accounts.entity';
import { UserAccountsService } from './user-accounts.service';

@Controller('user-accounts')
@ApiTags('masters')
export class UserAccountsController {
  constructor(private service: UserAccountsService) {}

  @Get('GetAllData')
  async getAllData() {
    return await this.service.getAllData();
  }

  @Get('GetDataById/:id')
  async getDataById(@Param('id') id) {
    return await this.service.getDataById(id);
  }

  @Post('postData')
  async saveData(@Body() body: UserAccounts) {
    return this.service.saveData(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.service.login(body);
  }
}
