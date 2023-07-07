import { Test } from '@nestjs/testing';
import { CarController } from '../car.controller';
import { CarService } from '../../service/car.service';

describe('CarController', () => {
  let carController: CarController;
  let carService: CarService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CarController],
      providers: [CarService],
    }).compile();

    carService = moduleRef.get<CarService>(CarService);
    carController = moduleRef.get<CarController>(CarController);
  });

  describe('getAll', () => {
    it('should return an array of cars', async () => {
      const carArray = [
        {
          id: 1,
          brand: 'test',
          model: 'test',
          year: 2010,
          km: 40000,
          color: 'test',
          airConditioning: true,
          passengers: 1,
          isManual: false,
        },
      ];

      jest.spyOn(carService, 'getAll').mockImplementation(() => carArray);

      expect(carController.getAll()).toBe(carArray);
    });
  });
});
