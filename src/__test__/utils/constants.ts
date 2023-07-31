import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseSchema } from '../../common/infrastructure/baseSchema';
import { CarSchema } from '../../module/car/infrastructure/car.schema';
import { UserSchema } from '../../module/user/infrastructure/user.schema';
import { ReservationSchema } from '../../module/reservation/infrastructure/reservation.schema';

export const testOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [BaseSchema, CarSchema, UserSchema, ReservationSchema],
  synchronize: true,
};

export const arraywithInvalidId = ['1,5', '0,4', ',2', 'a_c', 'a-c', '-1', '1-', 'a*c', 'a+c'];

export const badRequestIdValidation = {
  message: 'Validation failed (numeric string is expected)',
  error: 'Bad Request',
  statusCode: 400,
};

export const badRequestCarDtoValidation = {
  message: 'Validation failed',
  error: 'Bad Request',
  statusCode: 400,
};

export const errorFileIsRequired = {
  message: 'File is required',
  error: 'Bad Request',
  statusCode: 400,
};
