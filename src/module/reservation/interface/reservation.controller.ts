import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ReservationService } from '../application/reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly service: ReservationService) {}

  @Get()
  getReservations() {
    return this.service.findAll();
  }

  @Get(':reservationId')
  getReservation(@Param('reservationId', ParseIntPipe) reservationId: number) {
    return this.service.findOneById(reservationId);
  }

  @Post()
  createReservation(@Body() createReservationDto: any) {
    return this.service.create(createReservationDto);
  }

  @Patch(':reservationId')
  updateReservation(
    @Param('reservationId', ParseIntPipe) reservationId: number,
    @Body() fieldsToUpdate: any
  ) {
    return this.service.update(reservationId, fieldsToUpdate);
  }

  @Delete(':reservationId')
  deleteReservation(@Param('reservationId', ParseIntPipe) reservationId: number) {
    return this.service.delete(reservationId);
  }
}
