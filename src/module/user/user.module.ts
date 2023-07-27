import { Module } from '@nestjs/common';
import { UserController } from './interface/user.controller';
import { UserService } from './application/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
