import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Car } from '../domain/car.entity';
import { CreateCarDto } from '../interface/car.dto';

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

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

  update(id: number, fieldsToUpdate: Partial<CreateCarDto>): Promise<UpdateResult> {
    return this.carRepository.update({ id }, fieldsToUpdate);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.carRepository.delete({ id });
  }
}
