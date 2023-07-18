import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../domain/car.entity';
import { CreateCarDto } from '../interface/create-car.dto';

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  findById(id: number): Promise<Car> {
    return this.carRepository.findOne({
      where: {
        id,
      },
    });
  }

  create(car: CreateCarDto): Promise<Car> {
    const newCar = this.carRepository.create(car);
    return this.carRepository.save(newCar);
  }
}
