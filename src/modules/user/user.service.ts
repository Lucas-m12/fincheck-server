import { Injectable } from '@nestjs/common';
import { FindByIdDTO } from './dto/find-by-id.dto';
import { UserRepository } from './repositories/UserRepository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(dto: FindByIdDTO) {
    const user = await this.userRepository.findById(dto.userId);
    return {
      email: user.email,
      name: user.name,
    };
  }
}
