import { Category as CategoryPrisma } from '@prisma/client';
import { Category } from 'modules/category/entities/category.entity';

export class PrismaCategoryMapper {
  static toApp(category: CategoryPrisma): Category {
    return new Category({
      icon: category.icon,
      name: category.name,
      type: category.type,
      id: category.id,
      userId: category.userId,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });
  }
}
