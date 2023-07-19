import { Body, Controller, Param, Post, Patch, Get, Delete, ParseIntPipe } from '@nestjs/common';
import { CarService } from '../application/car.service';
import { CreateCarDto, UpdateCarDto } from './car.dto';
import { Car } from '../domain/car.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ValidationPipe } from '../../../common/interface/validation.pipe';

@Controller('cars')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Get()
  getCars(): Promise<Car[]> {
    return this.service.findAll();
  }

  @Get(':id')
  getCar(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<Car> {
    return this.service.findById(id);
  }

  @Post()
  save(@Body(new ValidationPipe()) newCar: CreateCarDto): Promise<Car> {
    return this.service.create(newCar);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) fieldsToUpdate: UpdateCarDto
  ): Promise<UpdateResult> {
    return this.service.update(id, fieldsToUpdate);
  }

  @Delete()
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
    return this.service.delete(id);
  }
}
