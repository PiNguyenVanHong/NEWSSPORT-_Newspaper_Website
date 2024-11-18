import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisCacheModule } from '@/redis-cache/redis-cache.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/auth/passwort/jwt-auth.guard';

import { ArticlesService } from '@/modules/articles/articles.service';
import { ArticlesController } from '@/modules/articles/articles.controller';
import { Article } from '@/modules/articles/entities/article.entity';
import { User } from '@/modules/users/entities/user.entity';
import { UsersModule } from '@/modules/users/users.module';
import { Category } from '@/modules/categories/entities/category.entity';
import { CategoriesModule } from '@/modules/categories/categories.module';
import { RolesGuard } from '@/modules/roles/guards/roles.guard';

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
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [ArticlesService],
})
export class ArticlesModule {}
