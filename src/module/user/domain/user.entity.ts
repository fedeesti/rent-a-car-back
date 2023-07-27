import { BaseEntity } from 'src/common/domain/base.entity';

export class UserEntity extends BaseEntity {
  public name: string;
  public lastname: string;
  public docType: string;
  public docNumber: string;
  public nationality: string;
  public address: string;
  public phone: string;
  public email: string;
  public birthdate: Date;
}
