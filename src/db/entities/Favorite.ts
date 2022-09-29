/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import Book from './Book';
import User from './User';

@Entity(({ name: 'favorite' }))
class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "integer",
    nullable: false,
  })
  userId: number;

  @Column({
    type: "integer",
    nullable: true,
  })
  bookId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
  book: Book;
}

export default Favorite;
