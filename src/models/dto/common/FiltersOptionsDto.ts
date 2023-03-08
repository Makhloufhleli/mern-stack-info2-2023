import { IsNotEmpty, IsOptional } from 'class-validator';
import { AddressTypes } from 'src/models/enums/AddressTypes';

export class FiltersOptionsDto {
  @IsNotEmpty()
  page: number;
  @IsNotEmpty()
  rowsPerPage: number;
  @IsNotEmpty()
  order: 'asc' | 'desc';
  @IsNotEmpty()
  orderBy: string;
  type: AddressTypes;
  @IsOptional()
  search: string;
}
