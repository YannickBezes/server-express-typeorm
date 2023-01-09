import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import User from '~/entity/user.entity';
import Question from '~/entity/question.entity';

@Entity()
export default class Answer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Question)
  @JoinColumn()
  question: Question;

  @Column({ type: 'integer', nullable: false})
  response: number;
}
