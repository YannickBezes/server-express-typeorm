import {NextFunction, Request, Response, Router} from 'express';
import CategoryService from '~/resources/category/category.service';
import {BadRequestException, NotFoundException} from '~/utils/exceptions';
import Category from '~/entity/category.entity';

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

CategoryController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // If parameter name isn't defined throw an error
    if (typeof req.body.name !== 'string' || req.body.name === '') {
      throw new BadRequestException(`The parameter 'name' is missing or is invalid!`);
    }
    const category = new Category();
    category.name = req.body.name;

    if (typeof req.body.nsfw === 'number' && (req.body.nsfw === 0 || req.body.nsfw === 1)) {
      category.nsfw = req.body.nfsw;
    }

    if (typeof req.body.description === 'string' && req.body.description !== '') {
      category.description = req.body.description;
    }

    return res
      .status(200)
      .json(await CategoryService.create(category));
  } catch (e) {
    next(e);
  }
});

CategoryController.get('/:category_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await CategoryService.findById(req.params.category_id);

    if (category === null) {
      throw new NotFoundException(`Category with id '${ req.params.category_id }' not found!`);
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
      throw new NotFoundException(`Category with id '${ req.params.category_id }' not found!`);
    }

    return res
      .status(200)
      .json(await CategoryService.getQuestions(req.params.category_id));
  } catch (e) {
    next(e);
  }
});

export default CategoryController;
