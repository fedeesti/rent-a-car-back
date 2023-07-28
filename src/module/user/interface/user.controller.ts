import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ValidationPipe } from '../../../common/interface/validation.pipe';
import { UserService } from '../application/user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { mapRequesttoEntity } from './user.mapper';
import { User } from '../domain/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    const users: User[] = await this.service.findUsers();
    return users;
  }

  @Get(':userId')
  getUser(
    @Param('userId', ParseIntPipe)
    userId: number
  ): Promise<User> {
    const user = this.service.findUserById(userId);
    return user;
  }

  @Post()
  createUser(@Body(new ValidationPipe()) userDto: CreateUserDto): Promise<User> {
    const newCar = mapRequesttoEntity(userDto);
    return this.service.create(newCar);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(new ValidationPipe()) fieldsToUpdate: UpdateUserDto
  ): Promise<User> {
    return this.service.update(userId, fieldsToUpdate);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return this.service.delete(userId);
  }
}
