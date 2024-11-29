import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialLinksService } from '@/modules/social-links/social-links.service';
import { SocialLinksController } from '@/modules/social-links/social-links.controller';
import { SocialLink } from '@/modules/social-links/entities/social-link.entity';
import { User } from '@/modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SocialLink])
  ],
  controllers: [SocialLinksController],
  providers: [SocialLinksService],
})
export class SocialLinksModule {}
