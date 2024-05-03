import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { ExceptionLogger } from './exception-logger.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ExceptionLoggerService {
  constructor(
    @InjectRepository(ExceptionLogger)
    private readonly exceptionLoggerRepo: MongoRepository<ExceptionLogger>,
  ) {}

  async getAllData() {
    return await this.exceptionLoggerRepo.find();
  }

  async getDataById(id) {
    let _result = await this.exceptionLoggerRepo.findOneBy({
      where: { _id: new ObjectId(id) },
    });
    return _result;
  }

  async saveData(body) {
    body.errorDetails =
      body.errorDetails === undefined ? '' : body.errorDetails;
    body.updatedAt = new Date();

    console.log('LoggerSerice', body);

    if (!body.id) {
      body.createdAt = new Date(body.createdAt.toString());
      return await this.exceptionLoggerRepo.save(body);
    } else {
      let _result = await this.exceptionLoggerRepo.update(body.id, body);
      return body;
    }
  }
}
