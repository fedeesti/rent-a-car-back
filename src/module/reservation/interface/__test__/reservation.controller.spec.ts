import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../reservation.controller';
import { ReservationService } from '../../application/reservation.service';
import { ReservationModule } from '../../reservation.module';
import { CreateReservationDto, UpdateReservationDto } from '../reservation.dto';
import { mockReservation } from '../../../../__test__/utils/mock-reservations';
import { Reservation } from '../../domain/reservation.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReservationSchema } from '../../infrastructure/reservation.schema';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ReservationModule],
    })
      .overrideProvider(getRepositoryToken(ReservationSchema))
      .useValue(jest.fn())
      .compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getReservations', () => {
    it('should return an array of reservations', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() =>
          Promise.resolve([mockReservation] as unknown as Promise<Reservation[]>)
        );

      const reservations = await controller.getReservations();

      expect(reservations).toEqual([mockReservation]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReservation', () => {
    it('should return a reservation', async () => {
      jest
        .spyOn(service, 'findOneById')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const reservation = await controller.getReservation(1);

      expect(reservation).toEqual(mockReservation);
      expect(service.findOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createReservation', () => {
    it('should create a reservation successfully', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const reservation = new CreateReservationDto();
      const createReservation = await controller.createReservation(reservation);

      expect(createReservation).toEqual(mockReservation);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateReservation', () => {
    it('should update a reservation successfully', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const fields = new UpdateReservationDto();
      const updateReservation = await controller.updateReservation(1, fields);

      expect(updateReservation).toEqual(mockReservation);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteReservation', () => {
    it('should delete a reservation successfully', async () => {
      jest
        .spyOn(service, 'delete')
        .mockImplementation(() =>
          Promise.resolve(mockReservation as unknown as Promise<Reservation>)
        );

      const deletReservation = await controller.deleteReservation(1);

      expect(deletReservation).toEqual(mockReservation);
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });
});
