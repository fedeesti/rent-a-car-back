import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../../application/user.service';
import { CreateUserDto } from '../user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const response = 'all users';

      jest.spyOn(service, 'findUsers').mockImplementation(() => response as string);

      const users = controller.getUsers();

      expect(users).toEqual(response);
      expect(service.findUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const userId = 1;
      const response = `User with id:${userId}`;

      jest.spyOn(service, 'findUserById').mockImplementation(() => response as string);

      const user = controller.getUser(userId);

      expect(user).toEqual(response);
      expect(service.findUserById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const response = {
        name: 'test',
        lastname: 'test',
        docType: 'test',
        docNumber: 'test',
        nationality: '12345678',
        address: 'test',
        phone: 'test',
        email: 'test@test.com',
        birthdate: new Date(),
      };

      jest.spyOn(service, 'create').mockImplementation(() => response);

      const userDto = new CreateUserDto();
      const userCreated = controller.createUser(userDto);

      expect(userCreated).toEqual(response);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const userId = 1;
      const fieldsToUpdate = { name: 'update' };
      const response = `User with id:${userId} update this fields ${fieldsToUpdate} has been updated`;

      jest.spyOn(service, 'update').mockImplementation(() => response);

      const userUpdated = controller.updateUser(userId, fieldsToUpdate);

      expect(userUpdated).toEqual(response);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should create a user successfully', async () => {
      const userId = 1;
      const response = `User with id:${userId} has been deleted`;

      jest.spyOn(service, 'delete').mockImplementation(() => response);

      const userDeleted = controller.deleteUser(userId);

      expect(userDeleted).toEqual(response);
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });
});
