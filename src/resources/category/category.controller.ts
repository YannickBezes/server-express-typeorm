import {NextFunction, Request, Response, Router} from 'express';
import CategoryService from '~/resources/category/category.service';
import {NotFoundException} from '~/utils/exceptions';

const CategoryController = Router();

CategoryController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res
      .status(200)
      .json(await CategoryService.findAll());
  } catch (e) {
    next(e);
  }
});

CategoryController.get('/:category_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await CategoryService.findById(req.params.category_id);

    if (category === null) {
      throw new NotFoundException(`Category with id '${req.params.category_id}' not found!`);
    }

    return res
      .status(200)
      .json(category);
  } catch (e) {
    next(e);
  }
});

CategoryController.get('/:category_id/questions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if category doesn't exist throw a 404
    if (!await CategoryService.exist(req.params.category_id)) {
      throw new NotFoundException( `Category with id '${req.params.category_id}' not found!`);
    }

    return res
      .status(200)
      .json(await CategoryService.getQuestions(req.params.category_id));
  } catch (e) {
    next(e);
  }
});

export default CategoryController;
