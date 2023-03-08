import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ApiResponse } from '../dto/common/ApiResponse';
import { FiltersOptionsDto } from '../dto/common/FiltersOptionsDto';
import { PaginationResponse } from '../dto/common/PaginationResponse';
import { Address } from '../entities/Address';
import { AddressTypes } from '../enums/AddressTypes';

@Injectable()
export class AddressRepository extends Repository<Address> {
  constructor(private dataSource: DataSource) {
    super(Address, dataSource.createEntityManager());
  }

  /**
   *
   * @param options
   * @returns
   */
  async paginateAddresses(options: FiltersOptionsDto): Promise<PaginationResponse<Address>> {
    try {
      const { page, rowsPerPage, orderBy, order, search, type } = options;
      const query = this.createQueryBuilder('address');
      const [results, total] = await query
        .where(type ? 'address.type = :type' : 'true', { type: AddressTypes[type] })
        .andWhere(search ? 'address.street LIKE :search' : 'true', { search: `%${search}%` })
        .skip((page - 1) * rowsPerPage) // consider that page sent by client starts at 1 but here we need to start at 0
        .take(rowsPerPage)
        .orderBy(orderBy, order === 'asc' ? 'ASC' : 'DESC')
        .getManyAndCount();

      return new PaginationResponse(200, results, total, 'Addresses fetched successfully');
    } catch (error) {
      throw error;
    }
  }

  async deleteAddress(id: number): Promise<ApiResponse<boolean>> {
    try {
      return new ApiResponse<boolean>(
        (await this.delete(id)).affected > 0,
        200,
        'Address deleted successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  async getAddressById(id: number): Promise<ApiResponse<Address>> {
    try {
      return new ApiResponse<Address>(
        await this.findOne({ where: { id } }),
        200,
        'Address fetched successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param address
   * @returns
   */
  async createAddress(address: Address): Promise<ApiResponse<Address>> {
    try {
      return new ApiResponse<Address>(
        await this.save(address),
        200,
        'Address created successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @returns
   */
  async getAllAddresses(): Promise<Array<Address>> {
    try {
      return this.find();
    } catch (error) {
      throw error;
    }
  }
}
