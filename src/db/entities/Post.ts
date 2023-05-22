/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import User from './User';

@Entity(({ name: 'posts' }))
class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  userId: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  author: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  creationDate: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  message?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  media?: string[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}

export default Post;
