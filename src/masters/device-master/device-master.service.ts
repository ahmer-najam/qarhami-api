import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { DeviceMaster } from './device-master.entity';
import { SerialService } from '../../serial/serial.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class DeviceMasterService {
  constructor(
    @InjectRepository(DeviceMaster)
    private readonly deviceMasterRepo: MongoRepository<DeviceMaster>,
    private serialService: SerialService,
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
}
