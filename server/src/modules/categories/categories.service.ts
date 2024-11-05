import aqp from 'api-query-params';
import {
  Repository,
} from 'typeorm';
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

    return { message: "Create category sucessfully!!!" };
  }

  async findAll(query: string) {
    const { filter, skip, sort, projection } = aqp(query);

    const categoies = await this.categoryRepository.find({
      select: projection,
      skip,
      where: filter,
      order: sort,
    });
    return categoies;
  }

  async findOne(id: string) {
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
