import { UUID } from 'crypto';
import { SUUID } from 'short-uuid';
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
  @Column() vehicles?: UserVehicle[];
}

export class UserVehicle {
  id: SUUID;
  @Column() year: number;
  @Column() make: string;
  @Column() model: string;
  @Column() color: string;
  @Column() plateNo: string;
  @Column() deviceSerial?: string;
  @Column() vin: string;
  @Column() status?: string;
  @Column() imageUrl?: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class RefreshTokenDto {
  email: string;
}

export class UserVehicleDto {
  email: string;
  vehicle: UserVehicle;
}
