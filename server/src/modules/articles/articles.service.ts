import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import aqp from 'api-query-params';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersService } from '@/modules/users/users.service';
import { CategoriesService } from '@/modules/categories/categories.service';
import { Article } from '@/modules/articles/entities/article.entity';
import { ArticleStatus } from '@/modules/articles/entities/article.enum';
import { CreateArticleDto } from '@/modules/articles/dto/create-article.dto';
import { UpdateArticleDto } from '@/modules/articles/dto/update-article.dto';
import { UpdateArticleThumbnail } from '@/modules/articles/dto/update-article-thumbnail.dto';
// import { RedisCacheService } from '@/cache/redis-cache.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    // private readonly cacheService: RedisCacheService,
    private readonly articleRepository: Repository<Article>,
    private readonly categoryService: CategoriesService,
    private readonly userService: UsersService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const { title, description, content, link, categoryId, userId } =
      createArticleDto;

    if (!userId) {
      throw new BadRequestException('Please, login your account!!!');
    }

    const category = await this.categoryService.findOne(categoryId);

    const user = await this.userService.findOne(userId);

    const article = this.articleRepository.create({
      title,
      description,
      content,
      link,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
      category,
      user,
    });

    const newArticle = await this.articleRepository.insert(article);

    return newArticle.identifiers[0];
  }

  async updateArticleThumbnail(updateArticleThumbnail: UpdateArticleThumbnail) {
    const { articleId, path } = updateArticleThumbnail;

    await this.isExist(articleId);

    await this.articleRepository.update(
      { id: articleId },
      {
        thumbnail: path,
      },
    );

    return { message: 'Create article successfully' };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort, projection } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.user', 'user')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.link',
        'article.content',
        'article.thumbnail',
        'article.status',
        'article.isTopHeading',
        'article.pubDate',
        'article.createdAt',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.avatar',
        'category.id',
        'category.name',
      ])
      .orderBy('article.createdAt', 'DESC')
      .orderBy('article.isTopHeading', 'DESC');

    if (filter.isDelete) {
      queryBuilder.andWhere('article.isDeleted = :isDeleted', {
        isDeleted: filter.isDelete,
      });
    } else {
      queryBuilder.andWhere('article.isDeleted = :isDeleted', {
        isDeleted: false,
      });
    }

    if (filter.status) {
      if (filter.status.toUpperCase() !== 'ALL') {
        queryBuilder.andWhere('article.status = :status', {
          status: filter.status,
        });
      }
    } else {
      queryBuilder.andWhere('article.status = :status', {
        status: ArticleStatus.APPROVED,
      });
    }

    if (filter.categoryId) {
      queryBuilder.andWhere('category.id = :categoryId', {
        categoryId: filter.categoryId,
      });

      const skip = (current - 1) * pageSize;

      const [articles, total] = await queryBuilder
        .skip(skip)
        .take(pageSize)
        .getManyAndCount();
      let totalPages = Math.ceil(total / pageSize);

      return {
        meta: {
          current,
          pageSize,
          pages: totalPages,
          total: total,
        },
        results: articles,
      };
    }

    if (filter.title) {
      const [articles, total] = await queryBuilder
        .andWhere('article.title LIKE :title', {
          title: `%${filter.title.toString()}%`,
        })
        .getManyAndCount();

      let totalPages = Math.ceil(total / pageSize);

      return {
        meta: {
          current,
          pageSize,
          pages: totalPages,
          total: total,
        },
        results: articles,
      };
    }

    const skip = (current - 1) * pageSize;

    const [articles, total] = await queryBuilder
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();
    let totalPages = Math.ceil(total / pageSize);

    return {
      meta: {
        current,
        pageSize,
        pages: totalPages,
        total: total,
      },
      results: articles,
    };
  }

  async findAllTopHeading(query: string, current: number, pageSize: number) {
    const { filter, sort, projection } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.user', 'user')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.link',
        'article.content',
        'article.thumbnail',
        'article.status',
        'article.isTopHeading',
        'article.pubDate',
        'article.createdAt',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.avatar',
        'category.id',
        'category.name',
      ])
      .orderBy('article.createdAt', 'DESC')
      .orderBy('article.isTopHeading', 'DESC')
      .andWhere('article.isDeleted = :isDeleted', {
        isDeleted: false,
      })
      .andWhere('article.status = :status', {
        status: ArticleStatus.APPROVED,
      });

    const skip = (current - 1) * pageSize;

    const [articles, total] = await queryBuilder
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();
    let totalPages = Math.ceil(total / pageSize);

    return {
      meta: {
        current,
        pageSize,
        pages: totalPages,
        total: total,
      },
      results: articles,
    };
  }

  async findAllByUserId(
    userId: string,
    query: string,
    current: number,
    pageSize: number,
  ) {
    const { filter, sort, projection } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.user', 'user')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.link',
        'article.content',
        'article.thumbnail',
        'article.status',
        'article.pubDate',
        'article.createdAt',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.avatar',
        'category.id',
        'category.name',
      ])
      .where('user.id = :userId', { userId })
      .orderBy('article.createdAt', 'DESC');

    if (filter.isDelete) {
      queryBuilder.andWhere('article.isDeleted = :isDeleted', {
        isDeleted: filter.isDelete,
      });
    } else {
      queryBuilder.andWhere('article.isDeleted = :isDeleted', {
        isDeleted: false,
      });
    }

    if (filter.status) {
      if (filter.status.toUpperCase() !== 'ALL') {
        queryBuilder.andWhere('article.status = :status', {
          status: filter.status,
        });
      }
    } else {
      queryBuilder.andWhere('article.status = :status', {
        status: ArticleStatus.APPROVED,
      });
    }

    const skip = (current - 1) * pageSize;

    const [articles, total] = await queryBuilder
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    let totalPages = Math.ceil(total / pageSize);

    return {
      meta: {
        current,
        pageSize,
        pages: totalPages,
        total: total,
      },
      results: articles,
    };
  }

  async findAllOne(id: number) {
    const article = await this.articleRepository.findOneBy({ id });

    if (!article) {
      throw new NotFoundException('Article is not exist!!!');
    }

    return article;
  }

  async isExist(id: number) {
    const isExist = await this.articleRepository.existsBy({ id });

    if (!isExist) {
      throw new NotFoundException('Article is not exist!!!');
    }

    return isExist;
  }

  async findOne(id: number, query?: string, isBasis?: boolean) {
    const { filter, skip, sort, projection } = aqp(query);

    if (!isBasis) {
      const result = await this.articleRepository.findOne({
        where: { id },
      });

      return { result };
    }

    if (Object.keys(query).length !== 0) {
      return { result: null };
    } else {
      const result = await this.articleRepository
        .createQueryBuilder('article')
        .leftJoinAndSelect('article.user', 'user')
        .leftJoinAndSelect('article.category', 'category')
        .select([
          'article.id',
          'article.title',
          'article.description',
          'article.link',
          'article.content',
          'article.status',
          'article.thumbnail',
          'article.pubDate',
          'article.createdAt',
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.avatar',
          'category.id',
          'category.name',
        ])
        .where('article.id = :id', { id })
        .getOne();

      return { result };
    }
  }

  async findOneByCategoryId(categoryId: string) {
    const result = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.link',
        'article.content',
        'article.thumbnail',
        'article.pubDate',
        'article.createdAt',
        'user.firstName',
        'user.lastName',
        'user.avatar',
      ])
      .where('category.id = :categoryId', { categoryId })
      .getMany();

    return { result };
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  async updateStatus(id: number, status: string) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    if (!status) {
      throw new BadRequestException('Please choose a status');
    }

    await this.articleRepository.update(id, { status });
    return { message: 'Article Update Successfully' };
  }

  async updateTopHeading(id: number, isTopHeading: boolean) {
    if (!isTopHeading) {
      throw new BadRequestException('Something went wrong!!!');
    }

    await this.articleRepository.update(id, { isTopHeading });
    return { message: 'Article Update Successfully' };
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
