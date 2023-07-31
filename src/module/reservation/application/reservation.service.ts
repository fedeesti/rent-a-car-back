import { Injectable } from '@nestjs/common';
import { UpdateReservationDto } from '../interface/reservation.dto';
import { Reservation } from '../domain/reservation.entity';
import { ReservationRepository } from '../infrastructure/reservation.repository';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find();
  }

  async findOneById(id: number): Promise<Reservation> {
    return await this.reservationRepository.findOne(id);
  }

  async create(newReservation: Reservation): Promise<Reservation> {
    return await this.reservationRepository.create(newReservation);
  }

  async update(id: number, fieldsToUpdate: UpdateReservationDto): Promise<Reservation> {
    return await this.reservationRepository.update(id, fieldsToUpdate);
  }

  async delete(id: number): Promise<Reservation> {
    return await this.reservationRepository.delete(id);
  }
}
