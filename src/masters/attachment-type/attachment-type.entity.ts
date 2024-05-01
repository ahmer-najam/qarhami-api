import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('AttachmentTypes')
export class AttachmentType {
  @ObjectIdColumn() id: ObjectId;
  @Column() attachmentTypeId: number;
  @Column() createdAt: Date;
  @Column() createdBy: number;
  @Column() updatedAt: Date;
  @Column() updatedBy: number;
  @Column() attachmentType: string;
}
