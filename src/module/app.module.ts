import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormConfig } from 'src/config/ormConfig';
@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), CarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
