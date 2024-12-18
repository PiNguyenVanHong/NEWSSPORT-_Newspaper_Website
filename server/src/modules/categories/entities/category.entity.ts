import { Article } from '@/modules/articles/entities/article.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: "categories" })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  alias: string;

  @Column()
  level: number;

  @Column({ default: false })
  isDeleted: boolean;

  @Column('datetime', { nullable: true })
  deletedAt: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Article, (article) => article.category, {
    cascade: true,
  })
  articles: Article[];
}
