import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseSchema } from 'src/common/infrastructure/baseSchema';
import { CarSchema } from 'src/module/car/infrastructure/car.schema';
import { UserSchema } from 'src/module/user/infrastructure/user.schema';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './data/database.db',
  entities: [BaseSchema, CarSchema, UserSchema],
  synchronize: true,
};
