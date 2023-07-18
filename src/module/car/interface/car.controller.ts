
import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';

import { CarService } from '../application/car.service';
import { CreateCarDto } from './create-car.dto';
import { Car } from '../domain/car.entity';
import { DeleteResult } from 'typeorm';

@Controller('cars')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Delete()
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.delete(Number(id));
  }

  @Post()
  save(@Body() newCar: CreateCarDto): Promise<Car> {
    return this.service.create(newCar);
  }
}
