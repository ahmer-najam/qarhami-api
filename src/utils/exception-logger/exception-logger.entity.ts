import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('ExceptionLogger')
export class ExceptionLogger {
  @ObjectIdColumn() id: ObjectId;
  @Column() createdAt: Date;
  @Column() createdBy: string;
  @Column() updatedAt: Date;
  @Column() updatedBy: string;
  @Column() statusCode: string;
  @Column() message: string;
  @Column() errorDetails?: string;
  @Column() source: string;
  @Column() url: string;
}
