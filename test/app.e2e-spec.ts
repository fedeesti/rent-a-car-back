import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from '../src/module/car/car.module';
import {
  testOrmConfig,
  badRequestIdValidation,
  errorFileIsRequired,
  mockInvalidCarDto,
  mockCarDto,
} from './utils/constants';

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
      await request(app.getHttpServer())
        .post('/cars')
        .attach('file', Buffer.alloc(1024, 'fake'), 'test.jpg')
        .field(mockCarDto)
        .expect(201);
    });

    it('when not uploading a file, should return a 422 status code with an error message', async () => {
      const { body } = await request(app.getHttpServer()).post('/cars').send(mockInvalidCarDto);

      expect(body).toEqual(errorFileIsRequired);
    });

    it('when sending an invalid car dto with a valid image, should return a 404 status code and an error message', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/cars')
        .attach('file', Buffer.alloc(1024, 'fake'), 'test.jpg')
        .field(mockInvalidCarDto)
        .expect(400);

      expect(body.error).toEqual('Bad Request');
    });

    it('when sending an invalid image with a valid car dto, should return a 422 status code and an error message', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/cars')
        .attach('file', Buffer.alloc(1024, 'fake'), 'test.txt')
        .field(mockCarDto)
        .expect(400);

      expect(body.error).toEqual('Bad Request');
      expect(body.message).toEqual('Unsupported file type .txt');
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
          .attach('file', Buffer.alloc(1024, 'fake'), 'test.jpg')
          .field(invalidData[i])
          .expect(400);

        expect(body.error).toEqual('Bad Request');
      }
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
