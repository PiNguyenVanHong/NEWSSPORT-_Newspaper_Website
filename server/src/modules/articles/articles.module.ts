import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesService } from '@/modules/articles/articles.service';
import { ArticlesController } from '@/modules/articles/articles.controller';
import { Article } from '@/modules/articles/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
