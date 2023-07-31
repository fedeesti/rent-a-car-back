import { Reservation } from '../../reservation/domain/reservation.entity';
import { BaseEntity } from '../../../common/domain/base.entity';
export class Car extends BaseEntity {
  public brand: string;
  public model: string;
  public color: string;
  public img: string;
  public kms: number;
  public passengers: number;
  public price: number;
  public year: number;
  public transmission: string;
  public airConditioner: boolean;
  public reservations: Reservation[];
  public deletedAt: Date;
}
