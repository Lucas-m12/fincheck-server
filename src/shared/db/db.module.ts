import { Global, Module } from '@nestjs/common';

import { CategoryRepository } from 'modules/category/category.repository';
import { UserRepository } from 'modules/user/repositories/UserRepository';
import { PrismaService } from './prisma.service';
import { PrismaCategoryRepository } from './repositories/prisma-category.repository';
import { PrismaUserRepository } from './repositories/prisma.user.repository';

@Global()
@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
  exports: [UserRepository, CategoryRepository],
})
export class DbModule {}
