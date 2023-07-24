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
  errorFileIsRequired,
  mockInvalidCarDto,
  mockCarDto,
} from './utils/constants';

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
    it('should create a team successfully', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/cars')
        .field('brand', mockCarDto.brand)
        .field('model', mockCarDto.model)
        .field('color', mockCarDto.color)
        .field('img', mockCarDto.img)
        .field('kms', mockCarDto.kms)
        .field('passengers', mockCarDto.passengers)
        .field('price', mockCarDto.price)
        .field('year', mockCarDto.year)
        .field('transmission', mockCarDto.transmission)
        .field('airConditioner', mockCarDto.airConditioner)
        .attach('file', 'test/utils/img.jpg')
        .expect(201);
    });

    it('when not uploading a file, should return a 422 status code with an error message', async () => {
      const { body } = await request(app.getHttpServer()).post('/cars').send(mockInvalidCarDto);

      expect(body).toEqual(errorFileIsRequired);
    });

    it('when sending an invalid car dto with a valid image, should return a 404 status code and an error message', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/cars')
        .field('brand', mockInvalidCarDto.brand)
        .field('model', mockInvalidCarDto.model)
        .field('color', mockInvalidCarDto.color)
        .field('img', mockInvalidCarDto.img)
        .field('kms', mockInvalidCarDto.kms)
        .field('passengers', mockInvalidCarDto.passengers)
        .field('price', mockInvalidCarDto.price)
        .field('year', mockInvalidCarDto.year)
        .field('transmission', mockInvalidCarDto.transmission)
        .field('airConditioner', mockInvalidCarDto.airConditioner)
        .attach('file', 'test/utils/img.jpg')
        .expect(400);

      expect(body.error).toEqual('Bad Request');
    });

    it('when sending an invalid image with a valid car dto, should return a 422 status code and an error message', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/cars')
        .field('brand', mockCarDto.brand)
        .field('model', mockCarDto.model)
        .field('color', mockCarDto.color)
        .field('img', mockCarDto.img)
        .field('kms', mockCarDto.kms)
        .field('passengers', mockCarDto.passengers)
        .field('price', mockCarDto.price)
        .field('year', mockCarDto.year)
        .field('transmission', mockCarDto.transmission)
        .field('airConditioner', mockCarDto.airConditioner)
        .attach('file', 'test/utils/text.txt')
        .expect(422);

      expect(body.error).toEqual('Unprocessable Entity');
      expect(body.message).toEqual('Validation failed (expected type is /(jpg|jpeg|png|svg)$/)');
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
        const { body } = await request(app.getHttpServer())
          .patch('/cars/1')
          .send(invalidData[i])
          .expect(400);

        expect(body.error).toEqual('Bad Request');
      }
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
