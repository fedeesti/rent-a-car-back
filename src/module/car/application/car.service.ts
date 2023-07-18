import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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

  delete(id: number): Promise<DeleteResult> {
    return this.carRepository.delete({ id });
}
  findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  update(id: number, fieldsToUpdate: Partial<CreateCarDto>): Promise<UpdateResult> {
    return this.carRepository.update({ id }, fieldsToUpdate);
  }
}
