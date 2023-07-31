import { Car } from '../../car/domain/car.entity';
import { BaseSchema } from '../../../common/infrastructure/baseSchema';
import { Reservation } from '../domain/reservation.entity';
import { User } from '../../user/domain/user.entity';

export const ReservationSchema = new BaseSchema<Reservation>({
  name: 'Reservation',
  target: Reservation,
  tableName: 'reservations',
  columns: {
    startDate: {
      type: 'date',
      name: 'satart_date',
    },
    finishDate: {
      type: 'date',
      name: 'finish_date',
    },
    pricePerDay: {
      type: Number,
      name: 'price_per_day',
    },
    totalPrice: {
      type: Number,
      name: 'total_price',
    },
    paymentMethod: {
      type: String,
      name: 'payment_method',
    },
    statusId: {
      type: Boolean,
      name: 'status',
    },
  },
});
