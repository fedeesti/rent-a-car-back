import { CreateReservationDto } from 'src/module/reservation/interface/reservation.dto';
import { Car } from '../../module/car/domain/car.entity';
import { Reservation } from '../../module/reservation/domain/reservation.entity';
import { User } from '../../module/user/domain/user.entity';

export const RESERVATION_ROUTE = '/reservation';

export const mockReservation: Reservation = {
  id: 1,
  startDate: new Date(),
  finishDate: new Date(),
  pricePerDay: 1,
  totalPrice: 5,
  paymentMethod: 'credit card',
  statusId: true,
  car: new Car(),
  user: new User(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockReservationDto: CreateReservationDto = {
  startDate: new Date(120, 11, 18),
  finishDate: new Date(120, 11, 18),
  pricePerDay: 1,
  totalPrice: 5,
  paymentMethod: 'test',
  statusId: true,
  car: new Car(),
  user: new User(),
};

export const reservationNotFoundMsgError = {
  message: 'Reservation with id 2 not found',
  error: 'Not Found',
  statusCode: 404,
};

export const reservationBadRequestValidationWithEmptyFields = {
  message: [
    'startDate must be a valid ISO 8601 date string',
    'startDate should not be empty',
    'finishDate must be a valid ISO 8601 date string',
    'finishDate should not be empty',
    'pricePerDay should not be empty',
    'totalPrice must be a number conforming to the specified constraints',
    'totalPrice should not be empty',
    'paymentMethod must be a string',
    'paymentMethod should not be empty',
    'statusId must be a boolean value',
    'statusId should not be empty',
  ],
  error: 'Bad Request',
  statusCode: 400,
};
