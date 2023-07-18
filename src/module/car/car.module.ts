import { Module } from '@nestjs/common';
import { CarController } from './interface/car.controller';
import { CarService } from './application/car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './domain/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
