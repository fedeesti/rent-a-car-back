import { Module } from '@nestjs/common';
import { CarController } from './interface/car.controller';
import { CarService } from './application/car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './domain/car.entity';
import { CarRepository } from './infrastructure/car.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarRepository, CarService],
})
export class CarModule {}
