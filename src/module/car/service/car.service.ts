import { Injectable } from '@nestjs/common';

@Injectable()
export class CarService {
  private cars = [
    {
      id: 1,
      brand: 'Chevrolet',
      model: 'Corsa',
      year: 2010,
      km: 40000,
      color: 'Gris',
      airConditioning: true,
      passengers: 5,
      isManual: false,
    },
    {
      id: 2,
      brand: 'Fiat',
      model: 'Cronos',
      year: 2021,
      km: 5000,
      color: 'Gris oscuro',
      airConditioning: true,
      passengers: 5,
      isManual: false,
    },
    {
      id: 3,
      brand: 'Nissan',
      model: 'March',
      year: 2017,
      km: 1000,
      color: 'Verde oscuro',
      airConditioning: true,
      passengers: 5,
      isManual: false,
    },
  ];

  getAll() {
    return this.cars;
  }
}
