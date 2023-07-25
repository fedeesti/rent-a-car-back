import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseSchema } from '../../src/common/infrastructure/baseSchema';
import { Car } from 'src/module/car/domain/car.entity';
import { CarSchema } from '../../src/module/car/infrastructure/car.schema';

export const testOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [BaseSchema, CarSchema],
  synchronize: true,
};

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

export const mockFile: Express.Multer.File = {
  fieldname: 'img',
  originalname: 'peugeot-207.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  size: 7528,
  destination: 'test',
  stream: undefined,
  filename: '',
  path: '',
  buffer: undefined,
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
  error: 'Bad Request',
  statusCode: 400,
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
