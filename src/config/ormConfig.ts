import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'rentcar.db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
