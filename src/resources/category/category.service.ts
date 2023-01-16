import Category from '~/entity/category.entity';
import CategoryRepository from '~/resources/category/category.repository';
import Question from '~/entity/question.entity';

class CategoryService {
  public findAll(): Promise<Category[]> {
    return CategoryRepository.findAll();
  }

  public findById(category_id: string): Promise<Category | null> {
    return CategoryRepository.findById(category_id);
  }

  public exist(category_id: string): Promise<boolean> {
    return CategoryRepository.exist(category_id);
  }

  public getQuestions(category_id: string): Promise<Question[]> {
    return CategoryRepository.getQuestionByCategory(category_id);
  }

  public create(category: Category): Promise<Category> {
    return CategoryRepository.addCategory(category);
  }
}

export default new CategoryService();
