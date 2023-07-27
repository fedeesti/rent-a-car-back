import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../interface/user.dto';

@Injectable()
export class UserService {
  findUsers() {
    return 'all users';
  }

  findUserById(userId: number) {
    return `User with id:${userId}`;
  }

  create(userDto: CreateUserDto) {
    return userDto;
  }

  update(userId: number, fieldsToUpdate: UpdateUserDto) {
    return `User with id:${userId} update this fields ${fieldsToUpdate} has been updated`;
  }

  delete(userId: number) {
    return `User with id:${userId} has been deleted`;
  }
}
