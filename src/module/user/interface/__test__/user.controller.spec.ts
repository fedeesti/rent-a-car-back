import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from '../user.controller';
import { CreateUserDto } from '../user.dto';
import { UserService } from '../../application/user.service';
import { UserModule } from '../../user.module';
import { UserSchema } from '../../infrastructure/user.schema';
import { User } from '../../domain/user.entity';
import { mockArrayOfUsers, mockUser } from '../../../../__test__/utils/mock-users';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getRepositoryToken(UserSchema))
      .useValue(jest.fn())
      .compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(service, 'findUsers')
        .mockImplementation(() => Promise.resolve(mockArrayOfUsers as unknown as Promise<User[]>));

      const users = await controller.getUsers();

      expect(users).toEqual(mockArrayOfUsers);
      expect(service.findUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const userId = 1;
      jest
        .spyOn(service, 'findUserById')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const user = await controller.getUser(userId);

      expect(user).toEqual(mockUser);
      expect(service.findUserById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const userDto = new CreateUserDto();
      const userCreated = await controller.createUser(userDto);

      expect(userCreated).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const userId = 1;
      const fieldsToUpdate = { name: 'update' };

      jest
        .spyOn(service, 'update')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const userUpdated = await controller.updateUser(userId, fieldsToUpdate);

      expect(userUpdated).toEqual(mockUser);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should create a user successfully', async () => {
      const userId = 1;
      const response = `User with id:${userId} has been deleted`;

      jest
        .spyOn(service, 'delete')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const userDeleted = await controller.deleteUser(userId);

      expect(userDeleted).toEqual(mockUser);
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });
});
