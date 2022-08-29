import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity(({ name: 'users' }))
class User extends BaseEntity {
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
    })
    password?: string;

  @Column({
    type: "date",
    nullable: true,
    })
    dob?: Date;
}

export default User;
