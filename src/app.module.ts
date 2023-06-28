import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'modules/auth/auth.guard';
import { AuthModule } from 'modules/auth/auth.module';
import { CategoryModule } from 'modules/category/category.module';
import { UserModule } from 'modules/user/user.module';
import { DbModule } from './shared/db/db.module';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    DbModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
