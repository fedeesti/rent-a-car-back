import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationService {
  findAll() {
    return 'Get all reservations';
  }

  findOneById(id: number) {
    return `Reservation with id: ${id}`;
  }

  create(createReservationDto: any) {
    return `Reservation: ${createReservationDto} has been created`;
  }

  update(id: number, fieldsToUpdate: any) {
    return `Reservation with id: ${id} with these fields: ${fieldsToUpdate} has been updated `;
  }

  delete(id: number) {
    return `Reservation with id: ${id} has been deleted`;
  }
}
