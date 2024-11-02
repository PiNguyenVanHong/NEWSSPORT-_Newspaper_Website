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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Roles } from '@/decorator/roles.decorator';
import { Role } from '@/modules/roles/role.enum';
import { multerOptions } from '@/helpers/storage.config';
import { ArticlesService } from '@/modules/articles/articles.service';
import { CreateArticleDto } from '@/modules/articles/dto/create-article.dto';
import { UpdateArticleDto } from '@/modules/articles/dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createArticleDto: CreateArticleDto, @Req() req) {
    return this.articlesService.create({...createArticleDto, userId: req.user.userId});
  }

  @Post('uploads/:id')
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.articlesService.updateArticleThumbnail({ articleId: id, path: file.path });
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
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
