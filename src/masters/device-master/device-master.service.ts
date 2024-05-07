import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { DeviceMaster, UpdateDeviceStatusDto } from './device-master.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class DeviceMasterService {
  constructor(
    @InjectRepository(DeviceMaster)
    private readonly deviceMasterRepo: MongoRepository<DeviceMaster>,
  ) {}

  async getAllData() {
    return await this.deviceMasterRepo.find();
  }

  async getDataById(id) {
    let _result = await this.deviceMasterRepo.findOneBy({
      where: { _id: new ObjectId(id) },
    });
    return _result;
  }

  async saveData(body: DeviceMaster) {
    body.updatedAt = new Date();

    if (!body.id) {
      body.createdAt = new Date();
      return await this.deviceMasterRepo.save(body);
    } else {
      let _result = await this.deviceMasterRepo.update(body.id, body);
      return body;
    }
  }

  async updateDeviceStatus(body: UpdateDeviceStatusDto) {
    let _device = await this.deviceMasterRepo.findOneBy({
      where: { imei: body.imei },
    });

    if (!body) {
      throw new NotFoundException({ message: 'Device not found' });
    }

    _device.updatedAt = new Date();
    _device.status = body.status;

    return await this.deviceMasterRepo.update(_device.id, _device);
  }
}
