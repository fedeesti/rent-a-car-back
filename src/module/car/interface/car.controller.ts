import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CarService } from '../application/car.service';
import { CreateCarDto } from './create-car.dto';
import { Car } from '../domain/car.entity';

@Controller('cars')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<Car> {
    return this.service.findById(Number(id));
  }

  @Post()
  save(@Body() newCar: CreateCarDto): Promise<Car> {
    return this.service.create(newCar);
  }
}
