import { CreateUserDto } from 'src/module/user/interface/user.dto';
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
    reservations: [],
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
  docNumber: '12345678',
  nationality: 'test',
  address: 'test',
  phone: 'test',
  email: 'test@test.com',
  reservations: [],
  birthdate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockUserDto: CreateUserDto = {
  name: 'test',
  lastname: 'test',
  docType: 'test',
  docNumber: '12345678',
  nationality: 'test',
  address: 'test',
  phone: 'test',
  email: 'test@test.com',
  birthdate: new Date(120, 11, 18),
};

export const userNotFoundException = {
  message: `User with id 2 not found`,
  error: 'Not Found',
  statusCode: 404,
};

export const BadRequestValidationWithEmptyFields = {
  message: [
    {
      field: 'name',
      error: 'name should not be empty',
    },
    {
      field: 'lastname',
      error: 'lastname should not be empty',
    },
    {
      field: 'docType',
      error: 'docType must be a string',
    },
    {
      field: 'docNumber',
      error: 'docNumber should not be empty',
    },
    {
      field: 'nationality',
      error: 'nationality should not be empty',
    },
    {
      field: 'address',
      error: 'address must be a string',
    },
    {
      field: 'phone',
      error: 'phone must be a string',
    },
    {
      field: 'email',
      error: 'email should not be empty',
    },
    {
      field: 'birthdate',
      error: 'birthdate should not be empty',
    },
  ],
  error: 'Bad Request',
  statusCode: 400,
};
