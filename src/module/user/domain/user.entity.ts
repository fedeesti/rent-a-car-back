import { BaseEntity } from '../../../common/domain/base.entity';
import { Reservation } from '../../reservation/domain/reservation.entity';

export class User extends BaseEntity {
  public name: string;
  public lastname: string;
  public docType: string;
  public docNumber: string;
  public nationality: string;
  public address: string;
  public phone: string;
  public email: string;
  public birthdate: Date;
  public reservations: Reservation[];
}
