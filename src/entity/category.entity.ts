import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Question from '~/entity/question.entity';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false, default: 0})
  nsfw: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Question, (question) => question.category)
  questions: Question[];
}
