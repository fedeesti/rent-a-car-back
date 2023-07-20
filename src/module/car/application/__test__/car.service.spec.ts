import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CarService } from '../car.service';
import { Car } from '../../domain/car.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCarDto, UpdateCarDto } from '../../interface/car.dto';

describe('CarService', () => {
  let carService: CarService;
  let carRepository: Repository<Car>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: getRepositoryToken(Car),
          useClass: Repository,
        },
      ],
    }).compile();

    carService = module.get<CarService>(CarService);
    carRepository = module.get<Repository<Car>>(getRepositoryToken(Car));
  });

  it('should be defined', () => {
    expect(carService).toBeDefined();
  });

  describe('Get all cars', () => {
    it('should call findAll method', async () => {
      const carArray: Car[] = [
        {
          id: 1,
          brand: 'test',
          model: 'test',
          color: 'test',
          img: 'test.png',
          kms: 1,
          passengers: 1,
          price: 1,
          year: 1,
          transmission: 'test',
          airConditioner: false,
          createdAt: new Date(),
        },
      ];

      jest
        .spyOn(carRepository, 'find')
        .mockImplementation(() => Promise.resolve(carArray as unknown as Promise<Car[]>));

      const result = await carService.findAll();

      expect(result).toHaveLength(1);
      expect(carRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get car by ID', () => {
    it('should call findById method with expected param', async () => {
      jest
        .spyOn(carRepository, 'findOne')
        .mockImplementation(() => Promise.resolve({ name: 'test' } as unknown as Promise<Car>));

      const id = 1;
      const result = await carService.findById(id);

      expect(result).toEqual({ name: 'test' });
      expect(carRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(carRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Save car in the database', () => {
    it('should call create method with expected param', async () => {
      jest.spyOn(carRepository, 'create').mockImplementation(jest.fn());

      jest
        .spyOn(carRepository, 'save')
        .mockImplementation(() => Promise.resolve({ name: 'test' } as unknown as Promise<Car>));

      const createCarDto = new CreateCarDto();
      const carCreated = await carService.create(createCarDto);

      expect(carCreated).toEqual({ name: 'test' });
      expect(carRepository.create).toHaveBeenCalledTimes(1);
      expect(carRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update a car in the database ', () => {
    it('should call update method with expected params', async () => {
      jest
        .spyOn(carRepository, 'update')
        .mockImplementation(() =>
          Promise.resolve({ affected: 1 } as unknown as Promise<UpdateResult>)
        );

      const updateCarDto = new UpdateCarDto();
      const id = 1;
      const result = await carService.update(id, updateCarDto);

      expect(result.affected).toEqual(1);
      expect(carRepository.update).toHaveBeenCalledWith({ id }, updateCarDto);
      expect(carRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete a car in the database', () => {
    it('should call delete method with expected params', async () => {
      jest
        .spyOn(carRepository, 'delete')
        .mockImplementation(() =>
          Promise.resolve({ affected: 1 } as unknown as Promise<DeleteResult>)
        );

      const id = 1;
      const result = await carService.delete(id);

      expect(result.affected).toEqual(1);
      expect(carRepository.delete).toHaveBeenCalledWith({ id });
      expect(carRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
