import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from '@/modules/articles/dto/create-article.dto';

export class UpdateArticleDto extends PartialType(
    OmitType(CreateArticleDto, ["userId",] as const)
) {}
