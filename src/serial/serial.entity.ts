import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('serials')
export class Serial {
  @ObjectIdColumn() id: ObjectId;
  @Column() serialId: number;
  @Column() cityId: number;
  @Column() userId: number;
  @Column() userRoleId: number;
  @Column() formlyId: number;
  @Column() businessId: number;
  @Column() bizStageId: number;
  @Column() leadStatusId: number;
  @Column() leadId: number;
  @Column() attachmentTypeId: number;
}
