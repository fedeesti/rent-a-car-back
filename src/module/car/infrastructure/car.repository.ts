import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../domain/car.entity';
import { CreateCarDto } from '../interface/car.dto';
import { CarSchema } from './car.schema';
import { ICarRepository } from '../application/car.repository.interface';

@Injectable()
export class CarRepository implements ICarRepository {
  constructor(
    @InjectRepository(CarSchema)
    private readonly repository: Repository<Car>
  ) {}

  find(): Promise<Car[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return car;
  }

  async create(car: Car): Promise<Car> {
    await this.repository.save(car);
    return car;
  }

  async update(id: number, fieldsToUpdate: Partial<CreateCarDto>): Promise<Car> {
    const updateCar = {
      id,
      ...fieldsToUpdate,
    };

    const car = await this.repository.preload(updateCar);

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return this.repository.save(car);
  }

  async delete(id: number): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }

    return this.repository.remove(car);
  }
}
