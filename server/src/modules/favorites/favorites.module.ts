import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@/modules/users/entities/user.entity';
import { UsersModule } from '@/modules/users/users.module';
import { Article } from '@/modules/articles/entities/article.entity';
import { ArticlesModule } from '@/modules/articles/articles.module';
import { Favorite } from '@/modules/favorites/entities/favorite.entity';
import { FavoritesService } from '@/modules/favorites/favorites.service';
import { FavoritesController } from '@/modules/favorites/favorites.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/auth/passwort/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite, User, Article]),
    UsersModule,
    ArticlesModule,
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ],
})
export class FavoritesModule {}
