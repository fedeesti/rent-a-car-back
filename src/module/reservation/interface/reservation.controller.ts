import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ReservationService } from '../application/reservation.service';
import { CreateReservationDto, UpdateReservationDto } from './reservation.dto';
import { mapRequestDtoToReservationEntity } from './reservation.mapper';
import { Reservation } from '../domain/reservation.entity';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly service: ReservationService) {}

  @Get()
  async getReservations() {
    return await this.service.findAll();
  }

  @Get(':reservationId')
  async getReservation(@Param('reservationId', ParseIntPipe) reservationId: number) {
    return await this.service.findOneById(reservationId);
  }

  @Post()
  createReservation(
    @Body(new ValidationPipe({ transform: true })) createReservationDto: CreateReservationDto
  ) {
    const newReservation: Reservation = mapRequestDtoToReservationEntity(createReservationDto);

    return this.service.create(newReservation);
  }

  @Patch(':reservationId')
  updateReservation(
    @Param('reservationId', ParseIntPipe) reservationId: number,
    @Body(new ValidationPipe({ transform: true })) fieldsToUpdate: UpdateReservationDto
  ) {
    return this.service.update(reservationId, fieldsToUpdate);
  }

  @Delete(':reservationId')
  deleteReservation(@Param('reservationId', ParseIntPipe) reservationId: number) {
    return this.service.delete(reservationId);
  }
}
