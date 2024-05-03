import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Manufacturers } from './manufacturers.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturers)
    private readonly manufacturersRepo: MongoRepository<Manufacturers>,
  ) {}

  async getAllData() {
    return await this.manufacturersRepo.find();
  }

  async getDataById(id) {
    let _result = await this.manufacturersRepo.findOneBy({
      where: { _id: new ObjectId(id) },
    });
    return _result;
  }

  async saveData(body: Manufacturers) {
    body.updatedAt = new Date();

    if (!body.id) {
      body.createdAt = new Date();
      return await this.manufacturersRepo.save(body);
    } else {
      let _result = await this.manufacturersRepo.update(body.id, body);
      return body;
    }
  }
}
