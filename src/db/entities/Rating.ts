/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import Book from './Book';
import User from './User';

@Entity(({ name: 'rating' }))
class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "integer",
    nullable: false,
  })
  userId: number;

  @Column({
    type: "integer",
    nullable: false,
  })
  bookId: number;

  @Column({
    type: "real",
    nullable: true,
  })
  rate: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
  book: Book;
}

export default Rating;
