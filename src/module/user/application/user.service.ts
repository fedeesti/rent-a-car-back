import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../interface/user.dto';
import { UserRepository } from '../infrastructure/user.repository';
import { User } from '../domain/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(userId: number): Promise<User> {
    return await this.userRepository.findOne(userId);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  async update(userId: number, fieldsToUpdate: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(userId, fieldsToUpdate);
  }

  async delete(userId: number): Promise<User> {
    return await this.userRepository.delete(userId);
  }
}
