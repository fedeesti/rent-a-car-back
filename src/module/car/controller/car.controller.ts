import { Controller, Get } from '@nestjs/common';
import { CarService } from '../service/car.service';

@Controller('car')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
