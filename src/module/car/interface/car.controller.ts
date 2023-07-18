import { Body, Controller, Param, Post, Patch } from '@nestjs/common';
import { CarService } from '../application/car.service';
import { CreateCarDto } from './create-car.dto';
import { Car } from '../domain/car.entity';
import { UpdateResult } from 'typeorm';

@Controller('cars')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() fieldsToUpdate: Partial<CreateCarDto>
  ): Promise<UpdateResult> {
    return this.service.update(Number(id), fieldsToUpdate);
  }

  @Post()
  save(@Body() newCar: CreateCarDto): Promise<Car> {
    return this.service.create(newCar);
  }
}
