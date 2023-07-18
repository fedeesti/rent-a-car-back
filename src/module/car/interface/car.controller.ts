import { Body, Controller, Get, Post } from '@nestjs/common';
import { CarService } from '../application/car.service';
import { CreateCarDto } from './create-car.dto';
import { Car } from '../domain/car.entity';

@Controller('cars')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Post()
  save(@Body() newCar: CreateCarDto): Promise<Car> {
    return this.service.create(newCar);
  }
}
