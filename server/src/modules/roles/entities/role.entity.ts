import { User } from '@/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  level: number;

  @Column({ default: false })
  isDeleted: boolean;

  @Column('datetime', { nullable: true })
  deletedAt: Date;

  @Column('datetime')
  @CreateDateColumn()
  createdAt: Date;

  @Column('datetime')
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
