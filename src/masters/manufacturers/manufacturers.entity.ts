import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('Manufacturers')
export class Manufacturers {
  @ObjectIdColumn() id: ObjectId;
  @Column() createdAt: Date;
  @Column() createdBy: number;
  @Column() updatedAt: Date;
  @Column() updatedBy: number;
  @Column() manufacturer: string;
}
