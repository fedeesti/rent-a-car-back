import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseSchema } from '../common/infrastructure/baseSchema';
import { CarSchema } from '../module/car/infrastructure/car.schema';
import { UserSchema } from '../module/user/infrastructure/user.schema';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './data/database.db',
  entities: [BaseSchema, CarSchema, UserSchema],
  synchronize: true,
};
