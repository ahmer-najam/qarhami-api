import {
  Entity,
  Column,
  ObjectId,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('city')
export class City {
  @ObjectIdColumn() id: ObjectId;
  @PrimaryGeneratedColumn() cityId: number;
  @Column() city: string;
  @Column() cityName: string;
  @Column() countryPrefix: string;
  @Column() cityNumber: number;
}
