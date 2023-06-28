import { User as UserPrisma } from '@prisma/client';
import { User } from 'modules/user/entities/user.entity';

export class PrismaUserMapper {
  static toApp(user: UserPrisma): User {
    if (!user) return null;
    return new User({
      cpf: user.cpf,
      email: user.email,
      name: user.name,
      password: user.password,
      id: user.id,
    });
  }

  // static toPrisma(user: User): UserPrisma {
  //   return {
  //     cpf: user.cpf,
  //     email: user.email,
  //     name: user.name,
  //     password: user.password,
  //     id: user.id,
  //   };
  // }
}
