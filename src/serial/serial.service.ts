import { Injectable } from '@nestjs/common';
import { Serial as SerialEntity } from '../serial/serial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class SerialService {
  constructor(
    @InjectRepository(SerialEntity)
    private readonly serialRepository: MongoRepository<SerialEntity>,
  ) {}

  async getNewSerial(key) {
    let _serial = await this.serialRepository.findOneBy({
      where: { id: new ObjectId('64dc5af98b420df2ebe2504e') },
    });

    _serial[key] = _serial[key] + 1;
    let _result: number = _serial[key];
    this.serialRepository.update(_serial.id, _serial);
    return _result;
  }
}
