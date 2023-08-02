import { Car } from '../domain/car.entity';
import { CreateCarDto, UpdateCarDto } from './car.dto';

export function mapRequestToEntity(request: CreateCarDto | UpdateCarDto, path: string): Car {
  const car = new Car();
  car.brand = request.brand;
  car.model = request.model;
  car.color = request.color;
  car.img = path;
  car.kms = request.kms;
  car.passengers = request.passengers;
  car.price = request.price;
  car.year = request.year;
  car.transmission = request.transmission;
  car.airConditioner = request.airConditioner;

  return car;
}
