import { Injectable } from '@nestjs/common';
import { Car } from '../domain/car.entity';
import { UpdateCarDto } from '../interface/car.dto';

import { CarRepository } from '../infrastructure/car.repository';
@Injectable()
export class CarService {
  constructor(private carRepository: CarRepository) {}

  async findAll(): Promise<Car[]> {
    const cars = await this.carRepository.find();
    console.log('CarService');
    cars[0] instanceof Car
      ? console.log('Es una entidad Car')
      : console.log('No es una entidad Car');

    return cars;
  }

  async findById(id: number): Promise<Car> {
    const car = await this.carRepository.findOne(id);
    return car;
  }

  async create(car: Car): Promise<Car> {
    return this.carRepository.create(car);
  }

  update(id: number, fieldsToUpdate: UpdateCarDto): Promise<Car> {
    return this.carRepository.update(id, fieldsToUpdate);
  }

  delete(id: number): Promise<Car> {
    return this.carRepository.delete(id);
  }
}
