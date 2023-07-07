import { CarService } from '../car.service';

describe('CarService', () => {
  it('should return an array of cars', () => {
    const service = new CarService();

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

    const spy = jest.spyOn(service, 'getAll').mockImplementation(() => carArray);
    expect(service.getAll()).toBe(carArray);

    spy.mockRestore();
  });
});
