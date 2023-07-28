import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../infrastructure/user.repository';
import { UpdateUserDto } from '../../interface/user.dto';
import { UserService } from '../user.service';
import { UserSchema } from '../../infrastructure/user.schema';
import { User } from '../../domain/user.entity';
import { mockArrayOfUsers, mockUser } from '../../../../__test__/utils/mock-users';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        {
          provide: getRepositoryToken(UserSchema),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUsers', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() => Promise.resolve(mockArrayOfUsers as unknown as Promise<User[]>));

      const users = await service.findUsers();

      expect(users).toEqual(mockArrayOfUsers);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUserById', () => {
    it('should return a user', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const id = 1;
      const user = await service.findUserById(id);

      expect(user).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledWith(id);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Create user', () => {
    it('should create a user successfully', async () => {
      jest
        .spyOn(repository, 'create')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const user = new User();
      const createdUser = await service.create(user);

      expect(createdUser).toEqual(mockUser);
      expect(repository.create).toHaveBeenCalledWith(user);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update user', () => {
    it('should update a user successfully', async () => {
      jest
        .spyOn(repository, 'update')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const id = 1;
      const fields = new UpdateUserDto();
      const updatedUser = await service.update(id, fields);

      expect(updatedUser).toEqual(mockUser);
      expect(repository.update).toHaveBeenCalledWith(id, fields);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete user', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const id = 1;
      const deletedUser = await service.delete(id);

      expect(deletedUser).toEqual(mockUser);
      expect(repository.delete).toHaveBeenCalledWith(id);
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
