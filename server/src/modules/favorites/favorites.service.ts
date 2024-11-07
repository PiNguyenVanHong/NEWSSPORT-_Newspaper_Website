import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UsersService } from '@/modules/users/users.service';
import { ArticlesService } from '@/modules/articles/articles.service';
import { Favorite } from '@/modules/favorites/entities/favorite.entity';
import { CreateFavoriteDto } from '@/modules/favorites/dto/create-favorite.dto';
import { UpdateFavoriteDto } from '@/modules/favorites/dto/update-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly usersService: UsersService,
    private readonly articlesService: ArticlesService,
  ) {}

  async isExist(userId: string, articleId: number) {
    const existingFavorite = await this.favoriteRepository.exists({
      where: { user: { id: userId }, article: { id: articleId } },
    });

    if (existingFavorite) {
      throw new BadRequestException('You already saved that article');
    }

    return existingFavorite;
  }

  async isFavorite(userId: string, articleId: number) {
    const isExist = await this.favoriteRepository.exists({
      where: { user: { id: userId }, article: { id: articleId } },
    });;

    return { result: isExist };
  }

  async create(createFavoriteDto: CreateFavoriteDto) {
    const { userId, articleId } = createFavoriteDto;

    if (!userId || !articleId)
      throw new BadRequestException('Something went wrong!!!');

    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const { result: article } = await this.articlesService.findOne(+articleId);
    if (!article) throw new NotFoundException('Article not found');

    await this.isExist(userId, +articleId);

    const favorite = this.favoriteRepository.create({
      user,
      article,
      createdAt: new Date(),
    });

    await this.favoriteRepository.insert(favorite);
    return { message: 'Saved Article Successfully!!!' };
  }

  async findAll(userId: string) {
    if(userId !== "") {
      const favorites = await this.favoriteRepository
        .createQueryBuilder('favorite')
        .leftJoinAndSelect('favorite.article', 'article')
        .leftJoinAndSelect('article.user', 'user')
        .leftJoinAndSelect('favorite.user', 'favUser')
        .where('favUser.id  = :userId', { userId })
        .select([
          'favorite.id',
          'favorite.id',
          'article.id',
          'article.title',
          'article.description',
          'article.thumbnail',
          'article.createdAt',
          'article.isDeleted',
          'user.id',
          'user.lastName',
          'user.firstName',
        ])
        .getMany();

      return { results: favorites}
    }
    return null;
  }

  async findAllByUserId(userId: string) {
    if(userId !== "") {
      const favorites = await this.favoriteRepository
        .createQueryBuilder('favorite')
        .leftJoinAndSelect('favorite.article', 'article')
        .leftJoinAndSelect('article.user', 'user')
        .leftJoinAndSelect('favorite.user', 'favUser')
        .where('favUser.id  = :userId', { userId })
        .select([
          'favorite.id',
          'favorite.id',
          'article.id',
          'article.title',
          'article.description',
          'article.thumbnail',
          'article.createdAt',
          'article.isDeleted',
          'user.id',
          'user.lastName',
          'user.firstName',
        ])
        .getMany();

      return { results: favorites}
    }
    return null;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  async remove(id: string) {
    await this.favoriteRepository.delete(id);
    return { message: 'Remove Favorite Successfully!!!' };
  }

  async removeByUserIdAndArticleId(userId: string, articleId: number) {
    const favorite = await this.favoriteRepository.findOne({
      where: { user: { id: userId }, article: { id: articleId } },
    });
  
    if (!favorite) throw new NotFoundException('Favorite not found');
  
    await this.favoriteRepository.remove(favorite);
    return { message: 'Remove Favorite Successfully!!!' };
  }
}
