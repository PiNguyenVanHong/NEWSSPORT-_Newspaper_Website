import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisCacheModule } from '@/redis-cache/redis-cache.module';

import { ArticlesService } from '@/modules/articles/articles.service';
import { ArticlesController } from '@/modules/articles/articles.controller';
import { Article } from '@/modules/articles/entities/article.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Category } from '@/modules/categories/entities/category.entity';
import { UsersModule } from '@/modules/users/users.module';
import { CategoriesModule } from '@/modules/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, User, Category]),
    UsersModule,
    RedisCacheModule,
    CategoriesModule,
  ],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
  ],
  exports: [ArticlesService],
})
export class ArticlesModule {}
