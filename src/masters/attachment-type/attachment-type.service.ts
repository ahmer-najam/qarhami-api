import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { AttachmentType } from './attachment-type.entity';
import { SerialService } from '../../serial/serial.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class AttachmentTypeService {
  constructor(
    @InjectRepository(AttachmentType)
    private readonly attachmentTypeRepo: MongoRepository<AttachmentType>,
    private serialService: SerialService,
  ) {}

  async getAllData() {
    return await this.attachmentTypeRepo.find();
  }

  async getDataById(id) {
    let _result = await this.attachmentTypeRepo.findOneBy({
      where: { _id: new ObjectId(id) },
    });
    return _result;
  }

  async saveData(body: AttachmentType) {
    body.createdAt = new Date(body.createdAt.toString());
    body.updatedAt = new Date(body.updatedAt.toString());

    if (!body.id) {
      body.attachmentTypeId = await this.serialService.getNewSerial(
        'attachmentTypeId',
      );
      return await this.attachmentTypeRepo.save(body);
    } else {
      let _result = await this.attachmentTypeRepo.update(body.id, body);
      return body;
    }
  }
}
