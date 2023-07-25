import { Injectable } from '@nestjs/common';
import { Car } from '../domain/car.entity';
import { CreateCarDto } from '../interface/car.dto';

import { CarRepository } from '../infrastructure/car.repository';
@Injectable()
export class CarService {
  constructor(private carRepository: CarRepository) {}

  findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  findById(id: number): Promise<Car> {
    return this.carRepository.findOne(id);
  }

  async create(car: Car): Promise<Car> {
    return this.carRepository.create(car);
  }

  update(id: number, fieldsToUpdate: Partial<CreateCarDto>): Promise<Car> {
    return this.carRepository.update(id, fieldsToUpdate);
  }

  delete(id: number): Promise<Car> {
    return this.carRepository.delete(id);
  }
}
