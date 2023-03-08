import { IsNotEmpty, IsEnum, IsDefined } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AddressTypes } from '../enums/AddressTypes';
import { User } from './User';
@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  street: string;
  @Column()
  city: string;
  @Column()
  @IsNotEmpty()
  country: string;
  @Column()
  postalCode: number;
  @Column({
    type: 'enum',
    enum: AddressTypes,
  })
  type: AddressTypes;
  user: User;
}
