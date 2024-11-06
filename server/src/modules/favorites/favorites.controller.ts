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
} from '@nestjs/common';
import { Request as ReqExpress } from 'express';
import { FavoritesService } from '@/modules/favorites/favorites.service';
import { CreateFavoriteDto } from '@/modules/favorites/dto/create-favorite.dto';
import { UpdateFavoriteDto } from '@/modules/favorites/dto/update-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() { articleId }: { articleId: string }, @Req() req: any) {
    const createFavoriteDto: CreateFavoriteDto = { articleId: articleId, userId: req.user.userId };
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.favoritesService.findAll(req.user.userId);
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
    @Req() req: any,
  ) {
    return this.favoritesService.removeByUserIdAndArticleId(req.user.userId, +articleId);
  }
}
