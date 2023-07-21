import { Repository } from 'typeorm';
import { CarService } from '../car.service';
import { Car } from '../../domain/car.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCarDto, UpdateCarDto } from '../../interface/car.dto';
import { arrayOfCars, car } from '../../interface/__test__/__mocks__/constants';
import { CarRepository } from '../../infrastructure/car.repository';

describe('CarService', () => {
  let carService: CarService;
  let carRepository: CarRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        CarRepository,
        {
          provide: getRepositoryToken(Car),
          useClass: Repository,
        },
      ],
    }).compile();

    carService = module.get<CarService>(CarService);
    carRepository = module.get<CarRepository>(CarRepository);
  });

  it('should be defined', () => {
    expect(carService).toBeDefined();
  });

  describe('Get all cars', () => {
    it('should call findAll method', async () => {
      jest
        .spyOn(carRepository, 'find')
        .mockImplementation(() => Promise.resolve(arrayOfCars as unknown as Promise<Car[]>));

      const result = await carService.findAll();

      expect(result).toHaveLength(1);
      expect(result).toEqual(arrayOfCars);
      expect(carRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get car by ID', () => {
    it('should call findById method with expected param', async () => {
      jest
        .spyOn(carRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(car as unknown as Promise<Car>));

      const id = 1;
      const result = await carService.findById(id);

      expect(result).toEqual(car);
      expect(carRepository.findOne).toHaveBeenCalledWith(id);
      expect(carRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Save car in the database', () => {
    it('should call create method with expected param', async () => {
      jest
        .spyOn(carRepository, 'create')
        .mockImplementation(() => Promise.resolve(car as unknown as Promise<Car>));

      const createCarDto = new CreateCarDto();
      const createCar = await carService.create(createCarDto);

      expect(createCar).toEqual(car);
      expect(carRepository.create).toHaveBeenCalledWith(createCarDto);
      expect(carRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update a car in the database ', () => {
    it('should call update method with expected params', async () => {
      jest
        .spyOn(carRepository, 'update')
        .mockImplementation(() => Promise.resolve(car as unknown as Promise<Car>));

      const updateCarDto = new UpdateCarDto();
      const id = 1;
      const updatedCar = await carService.update(id, updateCarDto);

      expect(updatedCar).toEqual(car);
      expect(carRepository.update).toHaveBeenCalledWith(id, updateCarDto);
      expect(carRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete a car in the database', () => {
    it('should call delete method with expected params', async () => {
      jest
        .spyOn(carRepository, 'delete')
        .mockImplementation(() => Promise.resolve(car as unknown as Promise<Car>));

      const id = 1;
      const deleteCar = await carService.delete(id);

      expect(deleteCar).toEqual(car);
      expect(carRepository.delete).toHaveBeenCalledWith(id);
      expect(carRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
