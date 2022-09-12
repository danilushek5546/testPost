/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity(({ name: 'users' }))
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: true,
  })
  fullName?: string;

  @Column({
    unique: true,
    type: "varchar",
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: false,
    select: false,
  })
  password?: string;

  @Column({
    type: "date",
    nullable: true,
  })
  dob?: Date;

  @Column({
    type: "varchar",
    nullable: true,
  })
  image?: string;
}

export default User;
