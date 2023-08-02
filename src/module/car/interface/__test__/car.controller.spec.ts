import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from '../car.controller';
import { CarService } from '../../application/car.service';
import { CarModule } from '../../car.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../../domain/car.entity';
import { CreateCarDto, UpdateCarDto } from '../car.dto';
import { mockArrayOfCars, mockCar, mockFile } from '../../../../__test__/utils/mock-cars';
import { CarSchema } from '../../infrastructure/car.schema';

describe('CarController', () => {
  let carController: CarController;
  let carService: CarService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [CarModule],
    })
      .overrideProvider(getRepositoryToken(CarSchema))
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
      jest
        .spyOn(carService, 'findAll')
        .mockImplementation(() => Promise.resolve(mockArrayOfCars as unknown as Promise<Car[]>));

      const result = await carController.getCars();

      expect(result).toHaveLength(1);
      // expect(result[0] instanceof Car).toEqual(true);
      expect(carService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a car', async () => {
      jest
        .spyOn(carService, 'findById')
        .mockImplementation(() => Promise.resolve(mockCar as unknown as Promise<Car>));

      const result: Car = await carController.getCar(1);

      expect(result).toEqual(mockCar);
      // expect(result instanceof Car).toEqual(true);
      expect(carService.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /cars', () => {
    it('should create a car successfully', async () => {
      jest
        .spyOn(carService, 'create')
        .mockImplementation(() => Promise.resolve(mockCar as unknown as Promise<Car>));

      const carDto = new CreateCarDto();
      const carCreated = await carController.save(mockFile, carDto);

      expect(carCreated).toEqual(mockCar);
      expect(carService.create).toHaveBeenCalledTimes(1);
      expect(carService.create).toHaveBeenCalledWith(carDto);
    });
  });

  describe('PATCH /cars/:id', () => {
    it('should update a car successfully', async () => {
      jest.spyOn(carService, 'update').mockImplementation(() => Promise.resolve(mockCar as Car));

      const updatedCarDto = new UpdateCarDto();
      const car = new Car();
      const updatedCar = await carController.update(1, mockFile, updatedCarDto);

      expect(updatedCar).toEqual(mockCar);
      expect(carService.update).toHaveBeenCalledTimes(1);
      expect(carService.update).toHaveBeenCalledWith(1, car);
    });
  });

  describe('DELETE /cars/:id', () => {
    it('should delete a car successfully', async () => {
      jest
        .spyOn(carService, 'delete')
        .mockImplementation(() => Promise.resolve(mockCar as unknown as Promise<Car>));

      const deleteCar = await carController.delete(1);

      expect(deleteCar).toEqual(mockCar);
      expect(carService.delete).toHaveBeenCalledTimes(1);
    });
  });
});
