import { Module } from '@nestjs/common';
import { ReservationController } from './interface/reservation.controller';
import { ReservationService } from './application/reservation.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
