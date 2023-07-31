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
    {
      field: 'startDate',
      error: 'startDate must be a valid ISO 8601 date string',
    },
    {
      field: 'finishDate',
      error: 'finishDate must be a valid ISO 8601 date string',
    },
    {
      field: 'pricePerDay',
      error: 'pricePerDay should not be empty',
    },
    {
      field: 'totalPrice',
      error: 'totalPrice must be a number conforming to the specified constraints',
    },
    {
      field: 'paymentMethod',
      error: 'paymentMethod must be a string',
    },
    {
      field: 'statusId',
      error: 'statusId must be a boolean value',
    },
  ],
  error: 'Bad Request',
  statusCode: 400,
};
