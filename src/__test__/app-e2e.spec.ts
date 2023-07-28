import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from '../module/car/car.module';
import { UserModule } from '../module/user/user.module';
import {
  testOrmConfig,
  badRequestIdValidation,
  arraywithInvalidId,
  errorFileIsRequired,
  mockInvalidCarDto,
} from './utils/constants';
import { mockCarDto, carNotFoundException } from './utils/mock-cars';
import {
  BadRequestValidationWithEmptyFields,
  mockUser,
  mockUserDto,
  userNotFoundException,
} from './utils/mock-users';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testOrmConfig), CarModule, UserModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
  describe('Cars /cars', () => {
    describe('GET', () => {
      it(`should return an array of cars`, async () => {
        const { body } = await request(app.getHttpServer()).get('/cars').expect(200);

        expect(body).toEqual([]);
      });
    });

    describe('POST', () => {
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

    describe('GET :id', () => {
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

        expect(body).toEqual(carNotFoundException);
      });

      it('when receiving a valid ID, you must return a car', async () => {
        const { body } = await request(app.getHttpServer()).get('/cars/1').expect(200);

        expect(body.id).toEqual(1);
        expect(body.brand).toEqual('test1');
      });
    });

    describe('PATCH :id', () => {
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

          expect(body).toEqual(carNotFoundException);
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

    describe('DELETE :id', () => {
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

        expect(body).toEqual(carNotFoundException);
      });

      it('when receiving a valid ID, you should delete a car', async () => {
        await request(app.getHttpServer()).delete('/cars/1').expect(200);

        const { body } = await request(app.getHttpServer()).get('/cars').expect(200);

        expect(body).toEqual([]);
      });
    });
  });

  describe('Users /user', () => {
    describe('GET', () => {
      it('should return an array of users', async () => {
        const { body } = await request(app.getHttpServer()).get('/user').expect(200);

        expect(body).toEqual([]);
      });
      it('', async () => {});
    });

    describe('POST', () => {
      describe('Valid fields', () => {
        it('should create a user successfully', async () => {
          await request(app.getHttpServer()).post('/user').send(mockUserDto).expect(201);

          const { body } = await request(app.getHttpServer()).get('/user').expect(200);

          expect(body).toHaveLength(1);
        });
      });

      describe('Invalid fields', () => {
        it('when sending a user dto empty, should return a bad request validation', async () => {
          const { body } = await request(app.getHttpServer()).post('/user').send({}).expect(400);

          expect(body).toEqual(BadRequestValidationWithEmptyFields);
        });
      });
    });

    describe('GET :id', () => {
      it('when receiving an invalid id, should return a message error with validation failed', async () => {
        for (let i = 0; i < arraywithInvalidId.length; i++) {
          const { body } = await request(app.getHttpServer())
            .get(`/user/${arraywithInvalidId[0]}`)
            .expect(400);

          expect(body).toEqual(badRequestIdValidation);
        }
      });

      it('when the user does not exist, it should return a not found error message', async () => {
        const { body } = await request(app.getHttpServer()).get('/user/2').expect(404);

        expect(body).toEqual(userNotFoundException);
      });
      it('when receiving a valid ID, you must return a user', async () => {
        const { body } = await request(app.getHttpServer()).get('/user/1').expect(200);

        expect(body.id).toEqual(1);
        expect(body.name).toEqual('test');
      });
    });

    describe('PATH :id', () => {
      describe('Valid fields', () => {
        it('should return an updated user', async () => {
          const { body } = await request(app.getHttpServer())
            .patch('/user/1')
            .send({ name: 'update' })
            .expect(200);

          expect(body.name).toEqual('update');
        });
      });

      describe('Invalid fields', () => {
        it('when receiving an invalid id, should return a message error with validation failed', async () => {
          for (let i = 0; i < arraywithInvalidId.length; i++) {
            const { body } = await request(app.getHttpServer())
              .patch(`/user/${arraywithInvalidId[0]}`)
              .expect(400);

            expect(body).toEqual(badRequestIdValidation);
          }
        });

        it('when the user does not exist, it should return a not found error message', async () => {
          const { body } = await request(app.getHttpServer()).patch('/user/2').expect(404);

          expect(body).toEqual(userNotFoundException);
        });
        it('when sending an invalid email, should return a message error', async () => {
          const invalidEmail = [
            {
              email: 'http://www.test.com',
            },
            {
              email: 'test@com',
            },
            {
              email: 'test',
            },
            {
              email: '1234',
            },
          ];

          const dataError = [
            {
              field: 'email',
              error: 'email must be an email',
            },
          ];

          for (let i = 0; i < invalidEmail.length; i++) {
            const { body } = await request(app.getHttpServer())
              .patch('/user/1')
              .send(invalidEmail[i])
              .expect(400);

            expect(body.error).toBe('Bad Request');
            expect(body.message).toEqual(expect.arrayContaining(dataError));
          }
        });
      });
    });

    describe('DELETE :id', () => {
      it('when receiving an invalid id, should return a message error with validation failed', async () => {
        for (let i = 0; i < arraywithInvalidId.length; i++) {
          const { body } = await request(app.getHttpServer())
            .delete(`/user/${arraywithInvalidId[0]}`)
            .expect(400);

          expect(body).toEqual(badRequestIdValidation);
        }
      });

      it('when the user does not exist, it should return a not found error message', async () => {
        const { body } = await request(app.getHttpServer()).delete('/user/2').expect(404);

        expect(body).toEqual(userNotFoundException);
      });
      it('when receiving a valid ID, you must return a user', async () => {
        await request(app.getHttpServer()).delete('/user/1').expect(200);

        const { body } = await request(app.getHttpServer()).get('/user').expect(200);

        expect(body).toEqual([]);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
