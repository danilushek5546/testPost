import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity(({ name: 'users' }))
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar"
  })
  fullName: string;

  @Column({
    unique: true,
    type: "varchar"
  })
  email: string;

  @Column({
    type: "varchar"
  })
  password: string;

  @Column({
    type: "date"
  })
  dob: Date;
}

export default User;