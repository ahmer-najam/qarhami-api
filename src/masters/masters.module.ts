import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceMaster } from './device-master/device-master.entity';
import { DeviceMasterController } from './device-master/device-master.controller';
import { DeviceMasterService } from './device-master/device-master.service';
import { Manufacturers } from './manufacturers/manufacturers.entity';
import { ManufacturersController } from './manufacturers/manufacturers.controller';
import { ManufacturersService } from './manufacturers/manufacturers.service';
import {
  UserAccounts,
  UserVehicle,
} from './user-accounts/user-accounts.entity';
import { UserAccountsService } from './user-accounts/user-accounts.service';
import { UserAccountsController } from './user-accounts/user-accounts.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DeviceMaster,
      Manufacturers,
      UserAccounts,
      UserVehicle,
    ]),
  ],
  controllers: [
    DeviceMasterController,
    ManufacturersController,
    UserAccountsController,
  ],
  providers: [
    DeviceMasterService,
    ManufacturersService,
    UserAccountsService,
    JwtService,
  ],
})
export class MastersModule {}
