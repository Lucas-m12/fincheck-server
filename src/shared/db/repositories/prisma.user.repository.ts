import { Injectable } from '@nestjs/common';
import { User } from 'modules/user/entities/user.entity';
import { UserRepository } from 'modules/user/repositories/UserRepository';
import { PrismaService } from 'shared/db/prisma.service';
import { PrismaUserMapper } from './mappers/user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        cpf: user.cpf,
        email: user.email,
        name: user.name,
        password: user.passwordHash,
        id: user.id,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
            ],
          },
        },
      },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    const output = PrismaUserMapper.toApp(user);
    return output;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    const output = PrismaUserMapper.toApp(user);
    return output;
  }

  async userExist(email: string): Promise<boolean> {
    const userExist = !!(await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    }));
    return userExist;
  }
}
