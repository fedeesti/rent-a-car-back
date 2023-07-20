import {
  Body,
  Controller,
  Param,
  Post,
  Patch,
  Get,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
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
  async getCar(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<Car> {
    const car: Car = await this.service.findById(id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  @Post()
  save(@Body(new ValidationPipe()) newCar: CreateCarDto): Promise<Car> {
    return this.service.create(newCar);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) fieldsToUpdate: UpdateCarDto
  ): Promise<UpdateResult> {
    return await this.service.update(id, fieldsToUpdate);
  }

  @Delete()
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.service.delete(id);
  }
}
