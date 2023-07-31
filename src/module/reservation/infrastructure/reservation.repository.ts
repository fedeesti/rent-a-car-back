import { Injectable, NotFoundException } from '@nestjs/common';
import { IReservationRepository } from '../application/reservation.interface.repository';
import { Reservation } from '../domain/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationSchema } from './reservation.schema';

@Injectable()
export class ReservationRepository implements IReservationRepository {
  constructor(
    @InjectRepository(ReservationSchema)
    private readonly repository: Repository<Reservation>
  ) {}

  async find(): Promise<Reservation[]> {
    const reservations = await this.repository.find();
    return reservations;
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!reservation) throw new NotFoundException(`User with id ${id} not found`);

    return reservation;
  }

  async create(newReservation: Reservation): Promise<Reservation> {
    return await this.repository.save(newReservation);
  }

  async update(id: number, fieldsToUpdate: Partial<Reservation>): Promise<Reservation> {
    const partialReservation = {
      id,
      ...fieldsToUpdate,
    };

    const reservation = await this.repository.preload(partialReservation);

    if (!reservation) throw new NotFoundException(`User with id ${id} not found`);

    return await this.repository.save(reservation);
  }

  async delete(id: number): Promise<Reservation> {
    const reservation = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!reservation) throw new NotFoundException(`User with id ${id} not found`);

    return this.repository.remove(reservation);
  }
}
