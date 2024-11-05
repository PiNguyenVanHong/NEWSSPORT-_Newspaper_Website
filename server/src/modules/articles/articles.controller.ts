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
  Req,
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

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createArticleDto: CreateArticleDto, @Req() req) {
    return this.articlesService.create({
      ...createArticleDto,
      userId: req.user.userId,
    });
  }

  @Post('uploads/:id')
  @Roles(Role.ADMIN)
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
  @CacheKey("all_articles")
  @CacheTTL(1)
  findAll(@Query() query: string) {
    return this.articlesService.findAll(query);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string, @Query() query: string) {
    return this.articlesService.findOne(+id, query);
  }

  @Get('')
  @Public()
  findOneByCategoryId(@Query('categoryId') categoryId: string, @Query() query: string) {
    return this.articlesService.findOneByCategoryId(categoryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
