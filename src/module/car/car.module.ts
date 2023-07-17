import { Module } from '@nestjs/common';
import { CarController } from './controller/car.controller';
import { CarService } from './service/car.service';

@Module({
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
