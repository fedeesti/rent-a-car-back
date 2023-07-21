import { Car } from 'src/module/car/domain/car.entity';
import { EntityNotFoundError } from 'typeorm';

export const arrayOfCars: Car[] = [
  {
    id: 1,
    brand: 'test',
    model: 'test',
    color: 'test',
    img: 'test.png',
    kms: 1,
    passengers: 1,
    price: 1,
    year: 2016,
    transmission: 'manual',
    airConditioner: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const car: Car = {
  id: 1,
  brand: 'test',
  model: 'test',
  color: 'test',
  img: 'test.png',
  kms: 1,
  passengers: 1,
  price: 1,
  year: 2016,
  transmission: 'manual',
  airConditioner: true,
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const notFoundException = {
  message: 'Car with id 12 not found',
  error: 'Not Found',
  statusCode: 404,
};

export const badRequestValidation = {
  message: 'Validation failed (numeric string is expected)',
  error: 'Bad Request',
  statusCode: 400,
};

export const badRequestValidationDto = {
  message: 'Validation failed',
  error: 'Bad Request',
  statusCode: 400,
};
