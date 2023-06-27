import { Module } from '@nestjs/common';
import { CategoryModule } from 'modules/category/category.module';
import { UserModule } from 'modules/user/user.module';
import { DbModule } from './shared/db/db.module';

@Module({
  imports: [UserModule, CategoryModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
