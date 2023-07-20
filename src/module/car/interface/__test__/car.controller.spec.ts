import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from '../car.controller';
import { CarService } from '../../application/car.service';
import { CarModule } from '../../car.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../../domain/car.entity';
import { CreateCarDto } from '../car.dto';
import { DeleteResult } from 'typeorm';

describe('CarController', () => {
  let carController: CarController;
  let carService: CarService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CarModule],
    })
      .overrideProvider(getRepositoryToken(Car))
      .useValue(jest.fn())
      .compile();

    carController = moduleRef.get<CarController>(CarController);
    carService = moduleRef.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(carController).toBeDefined();
  });

  describe('GET /users', () => {
    it('should return an array of cars', async () => {
      const carArray = [
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
          createdAt: '2023-07-17T17:34:27.000Z',
        },
      ];
      jest
        .spyOn(carService, 'findAll')
        .mockImplementation(() => Promise.resolve(carArray as unknown as Promise<Car[]>));

      const result = await carController.getCars();

      expect(result).toHaveLength(1);
      expect(carService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a car', async () => {
      const mockCar = {
        id: 1,
        brand: 'test',
        model: 'test',
        color: 'test',
        img: 'test.png',
        kms: 80,
        passengers: 1,
        price: 1,
        year: 2000,
        transmission: 'manual',
        airConditioner: true,
        createdAt: new Date(),
      };

      jest
        .spyOn(carService, 'findById')
        .mockImplementation(() => Promise.resolve(mockCar as unknown as Promise<Car>));

      const car: Car = await carController.getCar(1);

      expect(car).toEqual(mockCar);
      expect(carService.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('PATCH /cars/:id', () => {
    it('should return an object specifying a row has been updated', async () => {
      const mockPatchResult = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      jest.spyOn(carService, 'update').mockImplementation(() => Promise.resolve(mockPatchResult));

      const updatedCar = await carController.update(1, { brand: 'Peugeot' });

      expect(updatedCar.affected).toEqual(1);
      expect(carService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /cars', () => {
    it('should create a car successfully', async () => {
      const mockCar = {
        id: 1,
        brand: 'test',
        model: 'test',
        color: 'test',
        img: 'test.png',
        kms: 80,
        passengers: 1,
        price: 1,
        year: 2000,
        transmission: 'manual',
        airConditioner: true,
        createdAt: new Date(),
      };

      jest
        .spyOn(carService, 'create')
        .mockImplementation(() => Promise.resolve(mockCar as unknown as Promise<Car>));

      const carCreated = await carController.save({
        brand: 'test',
        model: 'test',
        color: 'test',
        img: 'test.png',
        kms: 80,
        passengers: 1,
        price: 1,
        year: 2000,
        transmission: 'manual',
        airConditioner: true,
      } as unknown as CreateCarDto);

      expect(carService.create).toHaveBeenCalledTimes(1);
      expect(carCreated.id).toEqual(1);
      expect(carCreated.brand).toEqual('test');
      expect(carCreated.model).toEqual('test');
      expect(carCreated.color).toEqual('test');
      expect(carCreated.img).toEqual('test.png');
      expect(carCreated.kms).toEqual(80);
      expect(carCreated.passengers).toEqual(1);
      expect(carCreated.price).toEqual(1);
      expect(carCreated.year).toEqual(2000);
      expect(carCreated.transmission).toEqual('manual');
      expect(carCreated.airConditioner).toEqual(true);
    });
  });

  describe('DELETE /cars/:id', () => {
    it('should return an object specifying a row has been deleted.', async () => {
      jest
        .spyOn(carService, 'delete')
        .mockImplementation(() =>
          Promise.resolve({ raw: [], affected: 1 } as unknown as Promise<DeleteResult>)
        );

      const deleteCar = await carController.delete(1);

      expect(deleteCar.affected).toEqual(1);
      expect(carService.delete).toHaveBeenCalledTimes(1);
    });
  });
});
