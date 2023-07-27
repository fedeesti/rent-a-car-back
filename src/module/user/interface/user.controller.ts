import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ValidationPipe } from '../../../common/interface/validation.pipe';
import { UserService } from '../application/user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getUsers() {
    const users = this.service.findUsers();
    return users;
  }

  @Get(':userId')
  getUser(
    @Param('userId', ParseIntPipe)
    userId: number
  ) {
    const user = this.service.findUserById(userId);
    return user;
  }

  @Post()
  createUser(@Body(new ValidationPipe()) userDto: CreateUserDto) {
    return this.service.create(userDto);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(new ValidationPipe()) fieldsToUpdate: UpdateUserDto
  ) {
    return this.service.update(userId, fieldsToUpdate);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.delete(userId);
  }
}
