/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfig } from './config/config';
import { Entities } from './models/entities';
import { AddressController } from './controllers/AddressController';
import { AddressService } from './models/services/AddressService';
import { AddressRepository } from './models/repositories/AddressRepository';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...MysqlConfig,
      entities: Entities,
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController, AddressController],
  providers: [AppService, AddressService, AddressRepository],
})
export class AppModule {}
