import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseSchema } from '../common/infrastructure/baseSchema';
import { CarSchema } from '../module/car/infrastructure/car.schema';
import { UserSchema } from '../module/user/infrastructure/user.schema';
import { ReservationSchema } from '../module/reservation/infrastructure/reservation.schema';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './data/database.db',
  entities: [BaseSchema, CarSchema, UserSchema, ReservationSchema],
  synchronize: true,
};
