import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CarModule } from '../src/module/car/car.module';
import { CarSchema } from '../src/module/car/infrastructure/car.schema';
import { BaseSchema } from '../src/common/infrastructure/baseSchema';
import {
  badRequestCarDtoValidation,
  badRequestIdValidation,
  invalidCarDtoData,
  mockCarDto,
} from '../test/__mocks__/constants';
import { execPath } from 'process';

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
    it('when sending an invalid car dto, should return a 404 status code and an error message', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/cars')
        .send(invalidCarDtoData)
        .expect(400);

      expect(body).toEqual(badRequestCarDtoValidation);
    });
    it('should create a team successfully', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/cars')
        .send(mockCarDto)
        .expect(201);

      console.log('carDto', body);
    });
  });

  describe('GET /cars/:id', () => {
    it('should return a car', async () => {
      const { statusCode, body } = await request(app.getHttpServer()).get('/cars/1').expect(200);

      expect(statusCode).toEqual(200);
      expect(body.id).toEqual(1);
      expect(body.brand).toEqual('test1');
    });
    it('when typing an invalid id, should return a 404 status code and an error message', async () => {
      const arraywithInvalidId = ['1,5', '0,4', ',2', 'a_c', 'a-c', '-1', '1-', 'a*c', 'a+c'];

      for (let i = 0; i < arraywithInvalidId.length; i++) {
        const { body } = await request(app.getHttpServer())
          .get(`/cars/${arraywithInvalidId[0]}`)
          .expect(400);

        expect(body).toEqual(badRequestIdValidation);
      }
    });
  });

  describe('PATCH /cars/:id', () => {
    it('when sending invalid fields, should return a 404 status code and an error message', async () => {
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

        expect(body).toEqual(badRequestCarDtoValidation);
      }
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
