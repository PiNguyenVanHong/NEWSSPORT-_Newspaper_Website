import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialLinksService } from '@/modules/social-links/social-links.service';
import { CreateSocialLinkDto } from '@/modules/social-links/dto/create-social-link.dto';
import { UpdateSocialLinkDto } from '@/modules/social-links/dto/update-social-link.dto';
import { CurrentUser } from '@/decorator/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';

@Controller('social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() createSocialLinkDto: CreateSocialLinkDto,
  ) {
    return this.socialLinksService.create(createSocialLinkDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: User,) {
    return this.socialLinksService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialLinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialLinkDto: UpdateSocialLinkDto) {
    return this.socialLinksService.update(+id, updateSocialLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialLinksService.remove(id);
  }
}
