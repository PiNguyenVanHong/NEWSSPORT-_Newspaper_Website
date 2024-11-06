import { Article } from '@/modules/articles/entities/article.entity';
import { User } from '@/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('datetime')
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Article, (article) => article.favorites)
  @JoinColumn({ name: 'article_id' })
  article: Article;
}
