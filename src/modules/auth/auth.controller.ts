import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'shared/decorators/isPublic';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
@IsPublic()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  authenticate(@Body() body: SignInDTO) {
    return this.authService.signIn(body);
  }

  @Post('signUp')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
