import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from '../src/module/car/car.module';
import {
  testOrmConfig,
  badRequestIdValidation,
  arraywithInvalidId,
  errorFileIsRequired,
  mockInvalidCarDto,
  mockCarDto,
  notFoundException,
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
      const { body } = await request(app.getHttpServer()).get('/cars').expect(200);

      expect(body).toEqual([]);
    });
  });

  describe('POST /cars', () => {
    describe('Valid fields', () => {
      it('should create a team successfully', async () => {
        await request(app.getHttpServer())
          .post('/cars')
          .attach('img', Buffer.alloc(1024, 'fake'), 'test.jpg')
          .field(mockCarDto)
          .expect(201);

        const { body } = await request(app.getHttpServer()).get('/cars').expect(200);

        expect(body).toHaveLength(1);
      });
    });

    describe('Invalid fields', () => {
      it('when not uploading a file, should return a 422 status code with an error message', async () => {
        const { body } = await request(app.getHttpServer()).post('/cars').send(mockInvalidCarDto);

        expect(body).toEqual(errorFileIsRequired);
      });

      it('when sending an invalid car dto with a valid image, should return a 404 status code and an error message', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/cars')
          .attach('img', Buffer.alloc(1024, 'fake'), 'test.jpg')
          .field(mockInvalidCarDto)
          .expect(400);

        expect(body.error).toEqual('Bad Request');
      });

      it('when sending an invalid image with a valid car dto, should return a 422 status code and an error message', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/cars')
          .attach('img', Buffer.alloc(1024, 'fake'), 'test.txt')
          .field(mockCarDto)
          .expect(400);

        expect(body.error).toEqual('Bad Request');
        expect(body.message).toEqual('Unsupported file type .txt');
      });
    });
  });

  describe('GET /cars/:id', () => {
    it('when receiving an invalid id, should return a message error with validation failed', async () => {
      for (let i = 0; i < arraywithInvalidId.length; i++) {
        const { body } = await request(app.getHttpServer())
          .get(`/cars/${arraywithInvalidId[0]}`)
          .expect(400);

        expect(body).toEqual(badRequestIdValidation);
      }
    });

    it('when the car does not exist in the database, it should return a not found error message', async () => {
      const { body } = await request(app.getHttpServer()).get('/cars/2').expect(404);

      expect(body).toEqual(notFoundException);
    });

    it('when receiving a valid ID, you must return a car', async () => {
      const { body } = await request(app.getHttpServer()).get('/cars/1').expect(200);

      expect(body.id).toEqual(1);
      expect(body.brand).toEqual('test1');
    });
  });

  describe('PATCH /cars/:id', () => {
    describe('Valid fields', () => {
      it('when sending valid fields, should return an updated car', async () => {
        const { body } = await request(app.getHttpServer())
          .patch('/cars/1')
          .attach('img', Buffer.alloc(1024, 'fake'), 'test.jpg')
          .field('brand', 'testPatch')
          .expect(200);

        expect(body.brand).toEqual('testPatch');
      });
    });

    describe('Invalid fields', () => {
      it('when receiving an invalid id, should return a message error with validation failed', async () => {
        for (let i = 0; i < arraywithInvalidId.length; i++) {
          const { body } = await request(app.getHttpServer())
            .patch(`/cars/${arraywithInvalidId[0]}`)
            .expect(400);

          expect(body).toEqual(badRequestIdValidation);
        }
      });

      it('when the car does not exist in the database, it should return a not found error message', async () => {
        const { body } = await request(app.getHttpServer()).patch('/cars/2').expect(404);

        expect(body).toEqual(notFoundException);
      });

      it('when sending invalid fields with a valid image, should return a 404 status code and an error message', async () => {
        const invalidData = {
          brand: 'P',
          kms: 'test',
          passengers: 'test',
          price: 'test',
          year: 'test',
        };

        const { body } = await request(app.getHttpServer())
          .patch('/cars/1')
          .attach('img', Buffer.alloc(1024, 'fake'), 'test.jpg')
          .field(invalidData)
          .expect(400);

        expect(body.error).toEqual('Bad Request');
      });

      it('when sending valid fields with an invalid image, should return a 404 status code and an error message', async () => {
        const { body } = await request(app.getHttpServer())
          .patch('/cars/1')
          .attach('img', Buffer.alloc(1024, 'fake'), 'test.txt')
          .field('model', 'test')
          .expect(400);

        expect(body.error).toEqual('Bad Request');
        expect(body.message).toEqual('Unsupported file type .txt');
      });
    });
  });

  describe('DELETE /car/:id', () => {
    it('when receiving an invalid id, should return a message error with validation failed', async () => {
      for (let i = 0; i < arraywithInvalidId.length; i++) {
        const { body } = await request(app.getHttpServer())
          .delete(`/cars/${arraywithInvalidId[0]}`)
          .expect(400);

        expect(body).toEqual(badRequestIdValidation);
      }
    });
    it('when the car does not exist in the database, it should return a not found error message', async () => {
      const { body } = await request(app.getHttpServer()).delete('/cars/2').expect(404);

      expect(body).toEqual(notFoundException);
    });

    it('when receiving a valid ID, you should delete a car', async () => {
      await request(app.getHttpServer()).delete('/cars/1').expect(200);

      const { body } = await request(app.getHttpServer()).get('/cars').expect(200);

      expect(body).toEqual([]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
