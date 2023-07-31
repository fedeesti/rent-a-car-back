import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mockArrayOfUsers, mockUser } from '../../../../__test__/utils/mock-users';
import { UserRepository } from '../user.repository';
import { UpdateUserDto } from '../../interface/user.dto';
import { User } from '../../domain/user.entity';

describe('CarRepository', () => {
  let userRepository: UserRepository;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('Find all Users', () => {
    it('should return an array of users', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(() => Promise.resolve(mockArrayOfUsers as unknown as Promise<User[]>));

      const users = await userRepository.find();

      expect(users).toEqual(mockArrayOfUsers);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () => {
    it('should return a user', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const id = 1;
      const user = await userRepository.findOne(id);

      expect(user).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
    });
  });

  describe('Create a user', () => {
    it('should create a user successfully', async () => {
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const createUser = await userRepository.create(mockUser);

      expect(createUser).toEqual(mockUser);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('Update a user', () => {
    it('should update a user successfully', async () => {
      jest
        .spyOn(repository, 'preload')
        .mockImplementation(jest.fn(() => mockUser as unknown as Promise<User>));
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const id = 1;
      const userUpdateDto = new UpdateUserDto();
      const partialUser = {
        id,
        ...userUpdateDto,
      };
      const updateUser = await userRepository.update(id, userUpdateDto);

      expect(updateUser).toEqual(mockUser);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.preload).toHaveBeenCalledWith(partialUser);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('Delete a user', () => {
    it('should delete a user successfully', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      jest
        .spyOn(repository, 'remove')
        .mockImplementation(() => Promise.resolve(mockUser as unknown as Promise<User>));

      const id = 1;
      const deleteUser = await userRepository.delete(id);

      expect(deleteUser).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
      expect(repository.remove).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledWith(mockUser);
    });
  });
});
