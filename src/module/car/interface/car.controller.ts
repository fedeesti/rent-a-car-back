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
import { mapRequestToEntity } from './car.mapper';

@Controller('cars')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Get()
  async getCars(): Promise<Car[]> {
    const cars = await this.service.findAll();

    return cars;
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
  save(@Body(new ValidationPipe()) carDto: CreateCarDto): Promise<Car> {
    return this.service.create(mapRequestToEntity(carDto));
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
