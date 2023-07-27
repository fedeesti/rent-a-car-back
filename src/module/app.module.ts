import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormConfig } from '../config/ormConfig';
import { UserModule } from './user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), CarModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
