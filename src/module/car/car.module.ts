import { Module } from '@nestjs/common';
import { CarController } from './interface/car.controller';
import { CarService } from './application/car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepository } from './infrastructure/car.repository';
import { CarSchema } from './infrastructure/car.schema';

@Module({
  imports: [TypeOrmModule.forFeature([CarSchema])],
  controllers: [CarController],
  providers: [CarRepository, CarService],
})
export class CarModule {}
