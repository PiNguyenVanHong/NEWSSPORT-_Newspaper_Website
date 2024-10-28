import { Category } from '@/modules/categories/entities/category.entity';
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (category) => category.articles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column('datetime', { nullable: true })
  deletedAt: Date;

  @Column('timestamptz')
  @CreateDateColumn()
  createdAt: Date;

  @Column('timestamptz')
  @UpdateDateColumn()
  updatedAt: Date;
}
