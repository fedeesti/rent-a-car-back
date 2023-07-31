import { Repository } from 'typeorm';
import { ReservationRepository } from '../reservation.repository';
import { Reservation } from '../../domain/reservation.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockReservation } from '../../../../__test__/utils/mock-reservations';
import { UpdateReservationDto } from '../../interface/reservation.dto';

describe('ReservationRepository', () => {
  let reservationRepository: ReservationRepository;
  let repository: Repository<Reservation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationRepository,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
      ],
    }).compile();

    reservationRepository = module.get<ReservationRepository>(ReservationRepository);
    repository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(reservationRepository).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Find all reservations', () => {
    it('should return an array of reservations', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() =>
          Promise.resolve([mockReservation] as unknown as Promise<Reservation[]>)
        );

      const reservations = await reservationRepository.find();

      expect(reservations).toEqual([mockReservation]);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find one reservations', () => {
    it('should return a reservation', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const id = 1;
      const reservation = await reservationRepository.findOne(id);

      expect(reservation).toEqual(mockReservation);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
    });
  });

  describe('Create a reservation', () => {
    it('should create a reservation successfully', async () => {
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const reservation = new Reservation();
      const createReservation = await reservationRepository.create(reservation);

      expect(createReservation).toEqual(mockReservation);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(reservation);
    });
  });

  describe('Update a reservation', () => {
    it('should update a reservation successfully', async () => {
      jest
        .spyOn(repository, 'preload')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      jest
        .spyOn(repository, 'save')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const id = 1;
      const fieldsToUpdate = new UpdateReservationDto();
      const partialReservation = {
        id,
        ...fieldsToUpdate,
      };
      const UpdateReservation = await reservationRepository.update(id, partialReservation);

      expect(UpdateReservation).toEqual(mockReservation);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.preload).toHaveBeenCalledWith(partialReservation);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(mockReservation);
    });
  });

  describe('Delete a reservation', () => {
    it('should delete a reservation successfully', async () => {
      jest
        .spyOn(repository, 'remove')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const id = 1;
      const deleteReservation = await reservationRepository.delete(id);

      expect(deleteReservation).toEqual(mockReservation);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
      expect(repository.remove).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledWith(mockReservation);
    });
  });
});
