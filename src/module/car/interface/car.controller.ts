import { Body, Controller, Param, Post, Patch, Get, Delete, ParseIntPipe } from '@nestjs/common';
import { CarService } from '../application/car.service';
import { CreateCarDto, UpdateCarDto } from './car.dto';
import { Car } from '../domain/car.entity';
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
  getCar(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<Car> {
    return this.service.findById(id);
  }

  @Post()
  save(@Body(new ValidationPipe()) carDto: CreateCarDto): Promise<Car> {
    return this.service.create(mapRequestToEntity(carDto));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) fieldsToUpdate: UpdateCarDto
  ): Promise<Car> {
    return this.service.update(id, fieldsToUpdate);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Car> {
    return this.service.delete(id);
  }
}
