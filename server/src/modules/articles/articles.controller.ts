import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Roles } from '@/decorator/roles.decorator';
import { Role } from '@/modules/roles/role.enum';
import { multerOptions } from '@/helpers/storage.config';
import { ArticlesService } from '@/modules/articles/articles.service';
import { CreateArticleDto } from '@/modules/articles/dto/create-article.dto';
import { UpdateArticleDto } from '@/modules/articles/dto/update-article.dto';
import { Public } from '@/decorator/auth.decorator';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CurrentUser } from '@/decorator/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.WRITER)
  create(@Body() createArticleDto: CreateArticleDto, @CurrentUser() user: User) {
    return this.articlesService.create({
      ...createArticleDto,
      userId: user.id,
    });
  }

  @Post('uploads/:id')
  @Roles(Role.ADMIN, Role.WRITER)
  @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.articlesService.updateArticleThumbnail({
      articleId: +id,
      path: file.path,
    });
  }

  @Get()
  @Public()
  @CacheKey('all_articles')
  @CacheTTL(1)
  findAll(
    @Query() query: string, 
    @Query("current") current: string,
    @Query("pageSize") pageSize: string) {
    return this.articlesService.findAll(query, +current, +pageSize);
  }

  @Get('top-heading')
  @Public()
  @CacheKey('top-heading_article')
  @CacheTTL(1)
  findAllTopHeading(
    @Query() query: string, 
    @Query("current") current: string,
    @Query("pageSize") pageSize: string) {
    return this.articlesService.findAllTopHeading(query, +current, +pageSize);
  }

  @Get('me')
  findAllArticleByMe(
    @CurrentUser() user: User,
    @Query() query: string, 
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  ) {
    return this.articlesService.findAllByUserId(user.id, query, +current, +pageSize);
  }

  @Get(':id')
  @Public()
  @CacheKey("get_article")
  @CacheTTL(1000)
  findOne(
    @Param('id') id: string,
    @Query() query: string,
  ) {
    return this.articlesService.findOne(+id, query, true);
  }

  @Get('')
  @Public()
  findOneByCategoryId(
    @Query('categoryId') categoryId: string,
    @Query() query: string,
  ) {
    return this.articlesService.findOneByCategoryId(categoryId);
  }

  @Patch(':id')
  handleUpdate(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  updateStatus(
    @Param('id') id: string,
    @Body() { status }: { status: string }
  ) {
    return this.articlesService.updateStatus(+id, status);
  }

  @Patch(':id/top-heading')
  @Roles(Role.ADMIN)
  updateTopHeading(
    @Param('id') id: string,
    @Body() { isTopHeading }: { isTopHeading: string }
  ) {
    return this.articlesService.updateTopHeading(+id, Boolean(isTopHeading));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
