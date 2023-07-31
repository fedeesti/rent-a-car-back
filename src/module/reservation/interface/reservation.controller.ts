import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ReservationService } from '../application/reservation.service';
import { CreateReservationDto, UpdateReservationDto } from './reservation.dto';
import { ValidationPipe } from '../../../common/interface/validation.pipe';
import { mapRequestDtoToReservationEntity } from './reservation.mapper';
import { Reservation } from '../domain/reservation.entity';

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
  createReservation(@Body(new ValidationPipe()) createReservationDto: CreateReservationDto) {
    const newReservation: Reservation = mapRequestDtoToReservationEntity(createReservationDto);

    return this.service.create(newReservation);
  }

  @Patch(':reservationId')
  updateReservation(
    @Param('reservationId', ParseIntPipe) reservationId: number,
    @Body(new ValidationPipe()) fieldsToUpdate: UpdateReservationDto
  ) {
    return this.service.update(reservationId, fieldsToUpdate);
  }

  @Delete(':reservationId')
  deleteReservation(@Param('reservationId', ParseIntPipe) reservationId: number) {
    return this.service.delete(reservationId);
  }
}
