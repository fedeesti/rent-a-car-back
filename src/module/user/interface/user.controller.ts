import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from '../application/user.service';

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
  createUser(@Body() userDto: any) {
    return this.service.create(userDto);
  }

  @Patch(':userId')
  updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() fieldsToUpdate: any) {
    return this.service.update(userId, fieldsToUpdate);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.delete(userId);
  }
}
