import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Answer from '~/entity/answer.entity';


@Entity()
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  surname: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column('integer')
  birth_date: number;

  @Column({ type: 'text', nullable: false })
  country: string;

  @Column({ type: 'integer', default: 0 })
  validated: number;

  @Column('integer')
  created_at: number;

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];
}
