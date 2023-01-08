import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Pets {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;
}
