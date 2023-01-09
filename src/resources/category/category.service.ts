import Category from '~/entity/category.entity';
import CategoryRepository from '~/resources/category/category.repository';
import Question from '~/entity/question.entity';

class CategoryService {
  findAll(): Promise<Category[]> {
    return CategoryRepository.findAll();
  }

  findById(category_id: string): Promise<Category | null> {
    return CategoryRepository.findById(category_id);
  }

  exist(category_id: string): Promise<boolean> {
    return CategoryRepository.exist(category_id);
  }

  getQuestions(category_id: string): Promise<Question[]> {
    return CategoryRepository.getQuestionByCategory(category_id);
  }
}

export default new CategoryService();
