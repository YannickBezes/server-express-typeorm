import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import Category from '~/entity/category.entity';

@Entity()
export default class Question {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => Category, (category) => category.questions)
  @JoinColumn()
  category: Category;
}
