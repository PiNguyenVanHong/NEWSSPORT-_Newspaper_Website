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

    let totalItems = (await this.categoryRepository.find(filter)).length;
    let totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * pageSize;

    if (Object.keys(filter).length > 0 || projection || sort) {
      const categories = await this.categoryRepository.find({
        select: projection,
        skip,
        take: pageSize,
        where: filter,
        order: sort,
      });

      return {
        meta: {
          current,
          pageSize,
          pages: totalPages,
          total: totalItems,
        },
        results: categories,
      };
    } else {
      const [categories, total] = await this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.articles', 'article')
        .select([
          'category.id',
          'category.name',
          'category.alias',
          'category.description',
          'category.level',
          'category.isDeleted',
          'category.createdAt',
          'article.id',
          'article.title',
        ])
        .orderBy('category.level', 'ASC')
        .getManyAndCount();

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
