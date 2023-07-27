import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findUsers() {
    return 'all users';
  }

  findUserById(userId: number) {
    return `User with id:${userId}`;
  }

  create(userDto: any) {
    return userDto;
  }

  update(userId: number, fieldsToUpdate: any) {
    return `User with id:${userId} update this fields ${fieldsToUpdate} has been updated`;
  }

  delete(userId: number) {
    return `User with id:${userId} has been deleted`;
  }
}
