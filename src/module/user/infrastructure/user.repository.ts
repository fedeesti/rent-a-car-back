import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { IUserRepository } from '../application/user.repository.interface';
import { User } from '../domain/user.entity';
import { UserSchema } from './user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repository: Repository<User>
  ) {}

  async find(): Promise<User[]> {
    const users: User[] = await this.repository.find();

    return users.map((user) => plainToClass(User, user));
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return plainToClass(User, user);
  }

  async create(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async update(id: number, fieldsToUpdate: Partial<User>): Promise<User> {
    const partialUser = {
      id,
      ...fieldsToUpdate,
    };

    const user: User = await this.repository.preload(partialUser);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return this.repository.save(user);
  }

  async delete(id: number): Promise<User> {
    const user: User = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return this.repository.remove(user);
  }
}
