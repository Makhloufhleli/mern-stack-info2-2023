import { IsNotEmpty, IsEnum, IsDefined, IsEmpty } from 'class-validator';
import { AddressTypes } from '../../enums/AddressTypes';
export class CreateAddressDto {
  @IsEmpty({ message: 'Id shoud be empty', always: true })
  id: number;
  @IsNotEmpty({ message: 'Street is required' })
  street: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  postalCode: number;

  @IsNotEmpty()
  @IsEnum(AddressTypes)
  @IsDefined({ message: 'Type required' })
  type: AddressTypes;
}
