import { Module } from '@nestjs/common';
import { ReservationController } from './interface/reservation.controller';
import { ReservationService } from './application/reservation.service';
import { ReservationSchema } from './infrastructure/reservation.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationRepository } from './infrastructure/reservation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationSchema])],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
