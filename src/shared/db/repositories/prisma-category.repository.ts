import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'modules/category/category.repository';
import { Category } from 'modules/category/entities/category.entity';
import { PrismaService } from '../prisma.service';
import { PrismaCategoryMapper } from './mappers/category.mapper';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllByUserId(userId: string): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany({
      where: { userId },
    });
    const output = categories.map((category) =>
      PrismaCategoryMapper.toApp(category),
    );
    return output;
  }
}
