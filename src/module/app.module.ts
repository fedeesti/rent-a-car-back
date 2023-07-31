import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../config/ormConfig';
import { CarModule } from './car/car.module';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), CarModule, UserModule, ReservationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
