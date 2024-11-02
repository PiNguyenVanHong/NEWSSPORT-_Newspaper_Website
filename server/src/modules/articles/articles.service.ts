import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';
import { UpdateArticleThumbnail } from './dto/update-article-thumbnail.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly categoryService: CategoriesService,
    private readonly userService: UsersService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const { title, description, content, link, categoryId, userId } = createArticleDto;

    if(!userId) {
      throw new BadRequestException("Please, login your account!!!");
    }

    const category = await this.categoryService.findOne(categoryId);

    const user = await this.userService.findOne(userId);

    const article = this.articleRepository.create({
      title,
      description,
      content,
      link,
      status: 'PENDING',
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

  async findAll() {
    return await this.articleRepository.find();
  }

  async findAllOne(id: string) {
    const article = await this.articleRepository.findOneBy({ id });

    if (!article) {
      throw new NotFoundException('Article is not exist!!!');
    }

    return article;
  }

  async isExist(id: string) {
    const isExist = await this.articleRepository.existsBy({ id });

    if (!isExist) {
      throw new NotFoundException('Article is not exist!!!');
    }

    return isExist;
  }

  findOne(id: string) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
