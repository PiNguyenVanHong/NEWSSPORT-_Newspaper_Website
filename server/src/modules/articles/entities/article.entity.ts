import { Category } from '@/modules/categories/entities/category.entity';
import { Favorite } from '@/modules/favorites/entities/favorite.entity';
import { User } from '@/modules/users/entities/user.entity';
import { ArticleStatus } from '@/modules/articles/entities/article.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: "articles" })
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ "fulltext": true })
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column({ type: "mediumtext", nullable: true })
  content: string;

  @Column({ nullable: true })
  thumbnail: string;
  
  @Column('timestamp', { nullable: true })
  pubDate: Date;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.PENDING
  })
  status: string;

  @Column({ default: false })
  isTopHeading: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column('timestamp', { nullable: true })
  deletedAt: Date;

  @Column('datetime')
  @CreateDateColumn()
  createdAt: Date;

  @Column('datetime')
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Favorite, (favorite) => favorite.article)
  favorites: Favorite[];

  @ManyToOne(() => Category, (category) => category.articles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;
}