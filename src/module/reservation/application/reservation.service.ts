import { Injectable } from '@nestjs/common';
import { CreateReservationDto, UpdateReservationDto } from '../interface/reservation.dto';
import { Reservation } from '../domain/reservation.entity';

@Injectable()
export class ReservationService {
  findAll() {
    return 'Get all reservations';
  }

  findOneById(id: number) {
    return `Reservation with id: ${id}`;
  }

  create(newReservation: Reservation) {
    return `Reservation: ${newReservation} has been created`;
  }

  update(id: number, fieldsToUpdate: UpdateReservationDto) {
    return `Reservation with id: ${id} with these fields: ${fieldsToUpdate} has been updated `;
  }

  delete(id: number) {
    return `Reservation with id: ${id} has been deleted`;
  }
}
