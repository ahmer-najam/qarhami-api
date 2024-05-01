import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { City } from './city.entity';
import { SerialService } from './../serial/serial.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: MongoRepository<City>,
    private serialService: SerialService,
  ) {}

  async getAllCities() {
    return await this.cityRepo.find();
  }

  async getCityById(id) {
    let _result = await this.cityRepo.findOneBy({
      where: { _id: new ObjectId(id) },
    });
    return _result;
  }

  async getCityByNumber(id) {
    let _result = await this.cityRepo.findOneBy({
      where: { cityNumber: parseInt(id) },
    });
    return _result;
  }

  async deleteData(id) {
    let _result = await this.cityRepo.deleteOne({
      where: { id: new ObjectId(id) },
    });
    return _result;
  }

  async saveData(body: City) {
    if (!body.id) {
      // body.cityId = await this.serialService.getNewSerial('cityId');
      return await this.cityRepo.save(body);
    } else {
      let _result = await this.cityRepo.update(body.id, body);
      return body;
    }
  }
}
