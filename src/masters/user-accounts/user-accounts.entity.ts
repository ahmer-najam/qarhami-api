import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('UserAccounts')
export class UserAccounts {
  @ObjectIdColumn() id: ObjectId;
  @Column() createdAt: Date;
  @Column() createdBy: number;
  @Column() updatedAt: Date;
  @Column() updatedBy: number;
  @Column() userName: string;
  @Column() password: string;
  @Column() email: string;
  @Column() fullName: string;
  @Column() role: string;
  @Column() status: string;
  @Column() additionalInfo: string;
}

export class LoginDto {
  email: string;
  password: string;
}
