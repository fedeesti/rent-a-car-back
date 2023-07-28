import { User } from '../../module/user/domain/user.entity';

export const mockArrayOfUsers: User[] = [
  {
    id: 1,
    name: 'test',
    lastname: 'test',
    docType: 'test',
    docNumber: '12345678',
    nationality: 'test',
    address: 'test',
    phone: 'test',
    email: 'test@test.com',
    birthdate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockUser: User = {
  id: 1,
  name: 'test',
  lastname: 'test',
  docType: 'test',
  docNumber: 'test',
  nationality: 'test',
  address: 'test',
  phone: 'test',
  email: 'test@test.com',
  birthdate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
