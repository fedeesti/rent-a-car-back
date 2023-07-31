import { Reservation } from '../../reservation/domain/reservation.entity';
import { BaseSchema } from '../../../common/infrastructure/baseSchema';
import { User } from '../domain/user.entity';

export const UserSchema = new BaseSchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    name: {
      type: String,
      name: 'fisrt_name',
    },
    lastname: {
      type: String,
      name: 'last_name',
    },
    docType: {
      type: String,
      name: 'doc_type',
    },
    docNumber: {
      type: String,
      name: 'doc_number',
    },
    nationality: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    birthdate: {
      type: 'date',
    },
  },
  relations: {
    reservations: {
      type: 'one-to-many',
      target: () => Reservation,
      inverseSide: 'user',
      joinColumn: {
        name: 'user_id',
      },
    },
  },
});
