import aqp from 'api-query-params';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto } from '@/modules/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '@/modules/categories/dto/update-category.dto';
import { Category } from '@/modules/categories/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, description, alias, level } = createCategoryDto;

    const category = this.categoryRepository.create({
      name,
      description,
      alias,
      level,
    });

    await this.categoryRepository.insert(category);

    return { message: 'Create category sucessfully!!!' };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort, projection } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const skip = (current - 1) * pageSize;

    const queryBuilder = this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.level', 'ASC')
      .skip(skip)
      .take(pageSize);

    if (!projection) {
      queryBuilder.select([
        'category.id',
        'category.name',
        'category.alias',
        'category.description',
        'category.level',
        'category.isDeleted',
        'category.createdAt',
      ]);
    } else if (projection.articles) {
      queryBuilder
        .leftJoinAndSelect('category.articles', 'article')
        .select(['article.id', 'article.title']);
    }

    if (filter.isDeleted) {
      if (filter.isDeleted?.toUpperCase() !== 'ALL')
        queryBuilder.andWhere('category.isDeleted = :isDeleted', {
          isDeleted: filter.isDeleted,
        });
    } else {
      queryBuilder.andWhere('category.isDeleted = :isDeleted', {
        isDeleted: false,
      });
    }

    if (filter.alias) {
      queryBuilder.andWhere('category.alias = :alias', { alias: filter.alias });
    }

    const [categories, total] = await queryBuilder.getManyAndCount();

    let totalPages = Math.ceil(total / pageSize);

    return {
      meta: {
        current,
        pageSize,
        pages: totalPages,
        total: total,
      },
      results: categories,
    };
  }

  async findOne(id: string, query?: string) {
    const { filter, skip, sort, projection } = aqp(query);

    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Your category not found!!!');
    }

    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
