import { Global, Module } from '@nestjs/common';

import { UserRepository } from 'modules/user/repositories/UserRepository';
import { PrismaService } from './prisma.service';
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
  ],
  exports: [UserRepository],
})
export class DbModule {}
