import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Car } from '../src/module/car/domain/car.entity';
import { CarModule } from '../src/module/car/car.module';
import { CarSchema } from '../src/module/car/infrastructure/car.schema';
import { BaseSchema } from '../src/common/infrastructure/baseSchema';
import { homedir } from 'os';

const testOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [BaseSchema, CarSchema],
  synchronize: true,
};

describe('Cars', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testOrmConfig), CarModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('GET /cars', () => {
    it(`should return an array of cars`, async () => {
      const { statusCode, body } = await request(app.getHttpServer()).get('/cars');

      expect(statusCode).toEqual(200);
      expect(body).toEqual([]);
    });
  });

  describe('POST /cars', () => {
    it('should return a message error of validation failed', async () => {
      const invalidData = {
        brand: '',
        model: 207,
        color: 'rojo',
        img: 1,
        kms: 'test',
        passengers: 'test',
        price: 'test',
        year: 'test',
        transmission: true,
        airConditioner: 'undefined',
      };
      const { body } = await request(app.getHttpServer()).post('/cars').send(invalidData);

      expect(body.message).toEqual('Validation failed');
      expect(body.error).toEqual('Bad Request');
      expect(body.statusCode).toEqual(400);
    });
    it('should create a team successfully', async () => {
      const carDto = {
        brand: 'Chevrolet',
        model: 'Corsa',
        color: 'Gris',
        img: 'chevroletcorsa.png',
        kms: 40000,
        passengers: 5,
        price: 8000,
        year: 2010,
        transmission: 'manual',
        airConditioner: true,
      };

      const { body } = await request(app.getHttpServer()).post('/cars').send(carDto).expect(201);

      console.log(body);
    });
  });

  describe('GET /cars/:id', () => {
    it('should return a car', async () => {
      const { statusCode, body } = await request(app.getHttpServer()).get('/cars/1');

      expect(statusCode).toEqual(200);
      expect(body.brand).toEqual('Chevrolet');
      expect(body.model).toEqual('Corsa');
    });
  });

  describe('PATCH /cars/:id', () => {
    it('should return a message error of validation failed', async () => {
      const invalidData = [
        { brand: 'P' },
        { model: 207 },
        { color: 1 },
        { img: 1 },
        { kms: 'test' },
        { passengers: 'test' },
        { price: 'test' },
        { year: 'test' },
        { transmission: true },
        { airConditioner: 'undefined' },
      ];

      for (let i = 0; i < invalidData.length; i++) {
        const { body } = await request(app.getHttpServer()).patch('/cars/1').send(invalidData[i]);

        expect(body.message).toEqual('Validation failed');
        expect(body.error).toEqual('Bad Request');
        expect(body.statusCode).toEqual(400);
      }
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
