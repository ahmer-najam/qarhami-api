import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  LoginDto,
  RefreshTokenDto,
  UserAccounts,
  UserVehicleDto,
} from './user-accounts.entity';
import { UserAccountsService } from './user-accounts.service';
import { AuthenticationGuard } from 'src/auth/guards/Authentication.guard';

@Controller('user-accounts')
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

  @Get('GetDataByEmail/:id')
  @UseGuards(AuthenticationGuard)
  async getDataByEmail(@Param('id') id) {
    return await this.service.getDataByEmail(id);
  }

  @Post('postData')
  @UseGuards(AuthenticationGuard)
  async saveData(@Body() body: UserAccounts) {
    return this.service.saveData(body);
  }

  @Post('addVehicle')
  @UseGuards(AuthenticationGuard)
  async addVehicle(@Body() body: UserVehicleDto) {
    return this.service.addVehicle(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.service.login(body);
  }

  @Post('refreshToken')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.service.refreshToken(body);
  }
}
