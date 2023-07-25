import { Test, TestingModule } from '@nestjs/testing';
import { CarRepository } from '../car.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../../domain/car.entity';
import { Repository } from 'typeorm';
import { mockArrayOfCars, mockCar } from '../../../../../test/utils/constants';
import { CreateCarDto, UpdateCarDto } from '../../interface/car.dto';

describe('CarRepository', () => {
  let carRepository: CarRepository;
  let repository: Repository<Car>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarRepository,
        {
          provide: getRepositoryToken(Car),
          useClass: Repository,
        },
      ],
    }).compile();

    carRepository = module.get<CarRepository>(CarRepository);
    repository = module.get<Repository<Car>>(getRepositoryToken(Car));
  });

  it('should be defined', () => {
    expect(carRepository).toBeDefined();
  });

  describe('Find all Cars in database', () => {
    it('should return an array of cars', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() => Promise.resolve(mockArrayOfCars as unknown as Promise<Car[]>));

      const foundArrayOfCars = await carRepository.find();

      expect(foundArrayOfCars).toEqual(mockArrayOfCars);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne in database', () => {
    it('should return a car', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(mockCar as unknown as Promise<Car>));

      const id = 1;
      const foundCar = await carRepository.findOne(id);

      expect(foundCar).toEqual(mockCar);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
    });
  });

  describe('Create a car and save it in the database', () => {
    it('should return a created car', async () => {
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(mockCar as unknown as Promise<Car>));

      const createdCar = await carRepository.create(mockCar);

      expect(createdCar).toEqual(mockCar);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(mockCar);
    });
  });

  describe('Update a car and save it in the database', () => {
    it('should return a car updated', async () => {
      jest
        .spyOn(repository, 'preload')
        .mockImplementation(jest.fn(() => mockCar as unknown as Promise<Car>));
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(mockCar as unknown as Promise<Car>));

      const id = 1;
      const carUpdateDto = new UpdateCarDto();
      const updateCar = {
        id,
        ...carUpdateDto,
      };
      const updatedCar = await carRepository.update(id, carUpdateDto);

      expect(updatedCar).toEqual(mockCar);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.preload).toHaveBeenCalledWith(updateCar);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(mockCar);
    });
  });

  describe('Delete a car in the database', () => {
    it('should return a deleted car', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(mockCar as unknown as Promise<Car>));

      jest
        .spyOn(repository, 'remove')
        .mockImplementation(() => Promise.resolve(mockCar as unknown as Promise<Car>));

      const id = 1;
      const deletedCar = await carRepository.delete(id);

      expect(deletedCar).toEqual(mockCar);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
      expect(repository.remove).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledWith(mockCar);
    });
  });
});
