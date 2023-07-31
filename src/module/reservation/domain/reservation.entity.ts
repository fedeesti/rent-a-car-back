import { BaseEntity } from '../../../common/domain/base.entity';
import { Car } from '../../car/domain/car.entity';
import { User } from '../../user/domain/user.entity';

export class Reservation extends BaseEntity {
  startDate: Date;

  finishDate: Date;

  pricePerDay: number;

  totalPrice: number;

  paymentMethod: string;

  statusId: boolean;

  car: Car;

  user: User;
}
