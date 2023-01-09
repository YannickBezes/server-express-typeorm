import {AppDataSource} from '~/data-source';
import Category from '~/entity/category.entity';
import Question from '~/entity/question.entity';

const CategoryRepository = AppDataSource.getRepository(Category).extend({
  async findAll(): Promise<Category[]> {
    return this.createQueryBuilder('category')
      .getMany();
  },

  async findById(category_id: string): Promise<Category | null> {
    return this.createQueryBuilder('category')
      .where('category.id = :category_id', { category_id })
      .getOne();
  },

  async exist(category_id: string): Promise<boolean> {
    return this.createQueryBuilder('category')
      .where('category.id = :category_id', { category_id})
      .getExists();
  },

  async getQuestionByCategory(category_id: string): Promise<Question[]> {
    return this.createQueryBuilder('category')
      .relation(Category, 'questions')
      .of(category_id)
      .loadMany();
  }
});

export default CategoryRepository;
