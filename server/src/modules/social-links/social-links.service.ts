import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSocialLinkDto } from '@/modules/social-links/dto/create-social-link.dto';
import { UpdateSocialLinkDto } from '@/modules/social-links/dto/update-social-link.dto';
import { SocialLink } from '@/modules/social-links/entities/social-link.entity';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class SocialLinksService {
  constructor(
    @InjectRepository(SocialLink)
    private readonly socialLinkRepository: Repository<SocialLink>,
  ) {}

  async isExist(name: string, user: User) {
    const socialLinkExist = await this.socialLinkRepository.existsBy({
      name,
      user,
    });

    if (socialLinkExist) {
      throw new BadRequestException(`Your ${name} url already exist!!!`);
    }
  }

  async create(createSocialLinkDto: CreateSocialLinkDto, user: User) {
    const { name, url } = createSocialLinkDto;

    await this.isExist(name, user);

    const socialLink = this.socialLinkRepository.create({
      name,
      link: url,
      user,
    });

    await this.socialLinkRepository.insert(socialLink);

    return { message: 'Add Social Link Successfully!!!' };
  }

  async findAll(user: User) {
    return {
      results: await this.socialLinkRepository.findBy({
        user,
      }),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} socialLink`;
  }

  update(id: number, updateSocialLinkDto: UpdateSocialLinkDto) {
    return `This action updates a #${id} socialLink`;
  }

  async remove(id: string) {
    const isExist = await this.socialLinkRepository.existsBy({ id });

    if(!isExist) {
      throw new BadRequestException("Your social url is not exist!!!");
    }
    
    await this.socialLinkRepository.delete(id);
    return { message: "Remove social link successfully" };
  }
}
