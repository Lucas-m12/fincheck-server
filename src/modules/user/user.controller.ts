import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  me(@Req() request: any) {
    const userId = request?.userId;
    return this.userService.findUserById({ userId });
  }
}
