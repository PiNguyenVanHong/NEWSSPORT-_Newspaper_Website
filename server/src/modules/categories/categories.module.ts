import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesService } from '@/modules/categories/categories.service';
import { CategoriesController } from '@/modules/categories/categories.controller';
import { Category } from '@/modules/categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
