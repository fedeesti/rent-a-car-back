import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../entity/car.entity';
import { CreateCarDto } from '../controller/create-car.dto';

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  create(car: CreateCarDto): Promise<Car> {
    const newCar = this.carRepository.create(car);
    return this.carRepository.save(newCar);
  }
}
