import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../reservation.controller';
import { ReservationService } from '../../application/reservation.service';
import { ReservationModule } from '../../reservation.module';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ReservationModule],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getReservations', () => {
    it('should return an array of reservations', () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => 'Get all reservations');

      const reservations = service.findAll();

      expect(reservations).toEqual('Get all reservations');
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getReservation', () => {
    it('should return a reservation', () => {
      jest.spyOn(service, 'findOneById').mockImplementation(() => `Reservation with id: 1`);

      const reservation = service.findOneById(1);

      expect(reservation).toEqual('Reservation with id: 1');
      expect(service.findOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createReservation', () => {
    it('should create a reservation successfully', () => {
      jest.spyOn(service, 'create').mockImplementation(() => `Reservation: {} has been created`);

      const createReservation = service.create({});

      expect(createReservation).toEqual(`Reservation: {} has been created`);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateReservation', () => {
    it('should update a reservation successfully', () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(() => 'Reservation with id: 1 with these fields: {} has been updated');

      const updateReservation = service.update(1, {});

      expect(updateReservation).toEqual(
        'Reservation with id: 1 with these fields: {} has been updated'
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteReservation', () => {
    it('should delete a reservation successfully', () => {
      jest
        .spyOn(service, 'delete')
        .mockImplementation(() => 'Reservation with id: 1 has been deleted');

      const deletReservation = service.delete(1);

      expect(deletReservation).toEqual('Reservation with id: 1 has been deleted');
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });
});
