import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('DeviceMaster')
export class DeviceMaster {
  @ObjectIdColumn() id: ObjectId;
  @Column() createdAt: Date;
  @Column() createdBy: number;
  @Column() updatedAt: Date;
  @Column() updatedBy: number;
  @Column() serial: string;
  @Column() imei: string;
  @Column() iccid: string;
  @Column() status: string;
  @Column() manufacturerId: string;
  @Column() manufacturer: string;
}
