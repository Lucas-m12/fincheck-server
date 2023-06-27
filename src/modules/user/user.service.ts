import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { OutputCreate } from './outputs/user.output.service';
import { UserRepository } from './repositories/UserRepository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<OutputCreate> {
    const user = new User(createUserDto);
    const userAlreadyExist = await this.userRepository.userExist(user.email);
    if (userAlreadyExist) {
      throw new ConflictException('This email is already use');
    }
    await this.userRepository.create(user);
    const output = {
      cpf: user.cpf,
      id: user.id,
      name: user.name,
    };
    return output;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }
}
