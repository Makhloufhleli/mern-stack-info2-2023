import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateAddressDto } from 'src/models/dto/address/CreateAddressDto';
import { ApiResponse } from 'src/models/dto/common/ApiResponse';
import { FiltersOptionsDto } from 'src/models/dto/common/FiltersOptionsDto';
import { PaginationResponse } from 'src/models/dto/common/PaginationResponse';
import { Address } from 'src/models/entities/Address';
import { AddressService } from 'src/models/services/AddressService';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async paginateAddresses(
    @Query() options: FiltersOptionsDto,
  ): Promise<PaginationResponse<Address>> {
    return await this.addressService.paginateAddresses(options);
  }

  @Post()
  async createAddress(@Body() address: CreateAddressDto): Promise<ApiResponse<Address>> {
    return await this.addressService.createAddress(address as Address);
  }

  @Delete('/:id')
  async deleteAddress(@Param('id') id: number): Promise<ApiResponse<boolean>> {
    return await this.addressService.deleteAddress(id);
  }
}
