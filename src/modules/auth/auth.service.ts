import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'modules/user/entities/user.entity';
import { UserRepository } from 'modules/user/repositories/UserRepository';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthOutput } from './outputs/auth.output';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(data: SignInDTO): Promise<AuthOutput> {
    const { email, password } = data;
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.isValidPassword(password))
      throw new UnauthorizedException('Invalid credentials');
    const token = await this.generateAccessToken(user.id);
    return {
      user: {
        cpf: user.cpf,
        email: user.email,
        id: user.id,
        name: user.name,
      },
      token,
    };
  }

  async signUp(data: SignUpDto) {
    const user = new User(data);
    const userAlreadyExist = await this.userRepository.userExist(user.email);
    if (userAlreadyExist) {
      throw new ConflictException('This email is already use');
    }
    await this.userRepository.create(user);
    const token = await this.generateAccessToken(user.id);
    const output = {
      user: {
        cpf: user.cpf,
        id: user.id,
        name: user.name,
      },
      token,
    };
    return output;
  }

  private async generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
