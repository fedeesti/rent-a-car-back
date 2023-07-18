import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Car } from 'src/module/car/domain/car.entity';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'rentcar.db',
  entities: [Car],
  synchronize: true,
};
