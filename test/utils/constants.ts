import { Car } from 'src/module/car/domain/car.entity';

export const mockArrayOfCars: Car[] = [
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

export const mockCar: Car = {
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

export const mockCarDto = {
  brand: 'test1',
  model: 'test',
  color: 'test',
  img: 'test',
  kms: 1,
  passengers: 1,
  price: 1,
  year: 1,
  transmission: 'test',
  airConditioner: true,
};

export const notFoundException = {
  message: 'Car with id 12 not found',
  error: 'Not Found',
  statusCode: 404,
};

export const badRequestIdValidation = {
  message: 'Validation failed (numeric string is expected)',
  error: 'Bad Request',
  statusCode: 400,
};

export const badRequestCarDtoValidation = {
  message: 'Validation failed',
  error: 'Bad Request',
  statusCode: 400,
};

export const errorFileIsRequired = {
  message: 'File is required',
  error: 'Unprocessable Entity',
  statusCode: 422,
};

export const mockInvalidCarDto = {
  brand: '',
  model: 207,
  color: true,
  img: 1,
  kms: 'test',
  passengers: 'test',
  price: 'test',
  year: 'test',
  transmission: true,
  airConditioner: 'undefined',
};
