import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BaseSchema } from 'src/common/infrastructure/baseSchema';
import { CarSchema } from 'src/module/car/infrastructure/car.schema';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './data/database.db',
  entities: [BaseSchema, CarSchema],
  synchronize: true,
};
