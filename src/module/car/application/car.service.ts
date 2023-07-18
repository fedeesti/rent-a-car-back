import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Car } from '../domain/car.entity';
import { CreateCarDto } from '../interface/create-car.dto';

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  create(car: CreateCarDto): Promise<Car> {
    const newCar = this.carRepository.create(car);
    return this.carRepository.save(newCar);
  }

  update(id: number, fieldsToUpdate: Partial<CreateCarDto>): Promise<UpdateResult> {
    return this.carRepository.update({ id }, fieldsToUpdate);
  }
}
