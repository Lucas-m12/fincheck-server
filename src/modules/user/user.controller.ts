import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from 'shared/decorators/activeUserId';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.userService.findUserById({ userId });
  }
}
