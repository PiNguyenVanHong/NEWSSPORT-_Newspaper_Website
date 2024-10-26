import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'codes' })
export class Code {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  code: string;

  @Column('datetime')
  @CreateDateColumn()
  expires: Date;
}