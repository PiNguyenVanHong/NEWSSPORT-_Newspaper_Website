import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';
import { UpdateArticleThumbnail } from './dto/update-article-thumbnail.dto';
import aqp from 'api-query-params';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
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

  async findAll(query: string) {
    const { filter, skip, sort, projection } = aqp(query);

    const createBuilders = this.articleRepository
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
        'article.pubDate',
        'article.createdAt',
        'user.firstName',
        'user.lastName',
        'user.avatar',
        'category.id',
        'category.name',
      ]);

    if (filter.categoryId) {
      const articles = await createBuilders
        .andWhere('category.id = :categoryId', { categoryId: filter.categoryId })
        .getMany();

      return { results: articles };
    }

    if (filter.title) {
      const articles = await createBuilders
        .where('article.title LIKE :title', { title: `%${filter.title.toString()}%` })
        .getMany();

      return { results: articles };
    }

    const articles = await createBuilders.getMany();

    return { results: articles };
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

    if(!isBasis) {
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

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
