import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/errors/NotFoundiError';
import { ApiResponse } from '../dto/common/ApiResponse';
import { FiltersOptionsDto } from '../dto/common/FiltersOptionsDto';
import { Address } from '../entities/Address';
import { AddressRepository } from '../repositories/AddressRepository';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepository) {}

  async paginateAddresses(options: FiltersOptionsDto) {
    try {
      return await this.addressRepository.paginateAddresses(options);
    } catch (error) {
      throw error;
    }
  }
  async createAddress(address: Address): Promise<ApiResponse<Address>> {
    try {
      return await this.addressRepository.createAddress(address);
    } catch (error) {
      throw error;
    }
  }

  async deleteAddress(id: number): Promise<ApiResponse<boolean>> {
    try {
      if (!(await this.addressRepository.getAddressById(id)).data) {
        throw new NotFoundError('Address not found');
      }
      return await this.addressRepository.deleteAddress(id);
    } catch (error) {
      throw error;
    }
  }
}
