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
    reservations: [],
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
  reservations: [],
};

export const mockCarDto = {
  brand: 'test1',
  model: 'test',
  color: 'test',
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

export const carNotFoundException = {
  message: `Car with id 2 not found`,
  error: 'Not Found',
  statusCode: 404,
};
