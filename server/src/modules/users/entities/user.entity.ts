import { hashPassword } from '@/helpers/util';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
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

  @BeforeInsert()
  public async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
