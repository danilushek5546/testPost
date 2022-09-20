/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity(({ name: 'generes' }))
class Genere {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  name: string;
}

export default Genere;
