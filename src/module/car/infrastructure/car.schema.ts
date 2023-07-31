import { Car } from '../domain/car.entity';
import { BaseSchema } from '../../../common/infrastructure/baseSchema';
import { Reservation } from '../../reservation/domain/reservation.entity';

export const CarSchema = new BaseSchema<Car>({
  name: 'Car',
  target: Car,
  tableName: 'cars',
  columns: {
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    color: {
      type: String,
    },
    img: {
      type: String,
    },
    kms: {
      type: Number,
    },
    passengers: {
      type: Number,
    },
    price: {
      type: Number,
    },
    year: {
      type: Number,
    },
    transmission: {
      type: String,
    },
    airConditioner: {
      type: Boolean,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'datetime',
      deleteDate: true,
    },
  },
  relations: {
    reservations: {
      type: 'one-to-many',
      target: () => Reservation,
      inverseSide: 'car',
      joinColumn: {
        name: 'car_id',
      },
    },
  },
});
