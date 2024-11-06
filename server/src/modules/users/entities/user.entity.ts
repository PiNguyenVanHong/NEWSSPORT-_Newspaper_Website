import { hashPassword } from '@/helpers/util';
import { Article } from '@/modules/articles/entities/article.entity';
import { Favorite } from '@/modules/favorites/entities/favorite.entity';
import { Role } from '@/modules/roles/entities/role.entity';
import { SocialLink } from '@/modules/social-links/entities/social-link.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: true })
  isTwoFactorEnabled: boolean;

  @Column('datetime', { nullable: true })
  emailVerified: Date;

  @Column('datetime')
  @CreateDateColumn()
  createdAt: Date;

  @Column('datetime')
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @Column('datetime', { nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @OneToMany(() => SocialLink, (socialLink) => socialLink.user, {
    cascade: true,
  })
  socialLinks: SocialLink[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @BeforeInsert()
  public async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
