import { Category } from './entities/category.entity';

export abstract class CategoryRepository {
  abstract findAllByUserId(userId: string): Promise<Category[]>;
}
