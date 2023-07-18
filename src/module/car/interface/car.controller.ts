import { Body, Controller, Param, Post, Patch, Get, Delete } from '@nestjs/common';
import { CarService } from '../application/car.service';
import { CreateCarDto } from './create-car.dto';
import { Car } from '../domain/car.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('cars')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Get()
  getCars(): Promise<Car[]> {
    return this.service.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<Car> {
    return this.service.findById(Number(id));
  }

  @Post()
  save(@Body() newCar: CreateCarDto): Promise<Car> {
    return this.service.create(newCar);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() fieldsToUpdate: Partial<CreateCarDto>
  ): Promise<UpdateResult> {
    return this.service.update(Number(id), fieldsToUpdate);
  }

  @Delete()
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.delete(Number(id));
  }
}
