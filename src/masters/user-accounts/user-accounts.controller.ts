import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, UserAccounts } from './user-accounts.entity';
import { UserAccountsService } from './user-accounts.service';
import { AuthenticationGuard } from 'src/auth/guards/Authentication.guard';

@Controller('user-accounts')
@ApiTags('masters')
export class UserAccountsController {
  constructor(private service: UserAccountsService) {}

  @Get('GetAllData')
  @UseGuards(AuthenticationGuard)
  async getAllData() {
    return await this.service.getAllData();
  }

  @Get('GetDataById/:id')
  @UseGuards(AuthenticationGuard)
  async getDataById(@Param('id') id) {
    return await this.service.getDataById(id);
  }

  @Post('postData')
  @UseGuards(AuthenticationGuard)
  async saveData(@Body() body: UserAccounts) {
    return this.service.saveData(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.service.login(body);
  }
}
