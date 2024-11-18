import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Request as ReqExpress } from 'express';
import { FavoritesService } from '@/modules/favorites/favorites.service';
import { CreateFavoriteDto } from '@/modules/favorites/dto/create-favorite.dto';
import { UpdateFavoriteDto } from '@/modules/favorites/dto/update-favorite.dto';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CurrentUser } from '@/decorator/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() { articleId }: { articleId: string }, @CurrentUser() user: User) {
    const createFavoriteDto: CreateFavoriteDto = { articleId: articleId, userId: user.id };
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.favoritesService.findAll(user.id);
  }

  @Get('me')
  findAllByUserId(@CurrentUser() user: User) {
    return this.favoritesService.findAllByUserId(user.id);
  }

  @Get('check')
  @CacheKey("check_article")
  @CacheTTL(1000)
  isFavorite(
    @Query() { articleId }: { articleId: string },
    @CurrentUser() user: User
  ) {
    return this.favoritesService.isFavorite(user.id, +articleId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoritesService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }

  @Delete()
  removeByUserIdAndArticleId(
    @Body() { articleId }: { articleId: string },
    @CurrentUser() user: User,
  ) {
    return this.favoritesService.removeByUserIdAndArticleId(user.id, +articleId);
  }
}
