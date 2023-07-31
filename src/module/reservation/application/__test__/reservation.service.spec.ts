import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../reservation.service';
import { ReservationRepository } from '../../infrastructure/reservation.repository';
import { ReservationSchema } from '../../infrastructure/reservation.schema';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../../domain/reservation.entity';
import { UpdateReservationDto } from '../../interface/reservation.dto';
import { mockReservation } from '../../../../__test__/utils/mock-reservations';

describe('ReservationService', () => {
  let service: ReservationService;
  let repository: ReservationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        ReservationRepository,
        {
          provide: getRepositoryToken(ReservationSchema),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repository = module.get<ReservationRepository>(ReservationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find reservations', () => {
    it('should return an array of reservations', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() =>
          Promise.resolve([mockReservation] as unknown as Promise<Reservation[]>)
        );

      const reservations = await service.findAll();

      expect(reservations).toEqual([mockReservation]);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('find reservation', () => {
    it('should return a reservation', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const id = 1;
      const reservation = await service.findOneById(id);

      expect(reservation).toEqual(mockReservation);
      expect(repository.findOne).toHaveBeenCalledWith(id);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create reservation', () => {
    it('should create a reservation successfully', async () => {
      jest
        .spyOn(repository, 'create')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const newReservation = new Reservation();
      const createReservation = await service.create(newReservation);

      expect(createReservation).toEqual(mockReservation);
      expect(repository.create).toHaveBeenCalledWith(newReservation);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update reservation', () => {
    it('should update a reservation successfully', async () => {
      jest
        .spyOn(repository, 'update')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const id = 1;
      const fields = new UpdateReservationDto();
      const UpdateReservation = await service.update(id, fields);

      expect(UpdateReservation).toEqual(mockReservation);
      expect(repository.update).toHaveBeenCalledWith(id, fields);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete reservation', () => {
    it('should delete a reservation successfully', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const id = 1;
      const deleteReservation = await service.delete(id);

      expect(deleteReservation).toEqual(mockReservation);
      expect(repository.delete).toHaveBeenCalledWith(id);
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
