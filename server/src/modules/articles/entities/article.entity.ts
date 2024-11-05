import { Category } from '@/modules/categories/entities/category.entity';
import { User } from '@/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: "articles" })
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  status: string;

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

  @ManyToOne(() => Category, (category) => category.articles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;
}
