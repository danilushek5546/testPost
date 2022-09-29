/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Genere from './Geners';

@Entity(({ name: 'books' }))
class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    type: "varchar",
    nullable: false,
  })
  author: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description?: string;

  @Column({
    type: "real",
    nullable: false,
    default: 1,
  })
  rating: number;

  @Column({
    type: "varchar",
    nullable: true,
  })
  cover?: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  image?: string;

  @Column({
    type: "real",
    nullable: false,
  })
  price: number;

  @Column({
    type: "date",
    nullable: true,
  })
  dateOfIssue?: Date;

  @ManyToMany(() => Genere, genere => genere.id)
    @JoinTable()
    generes: Genere[];
}

export default Book;
