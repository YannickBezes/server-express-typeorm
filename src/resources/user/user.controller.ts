import {NextFunction, Request, Response, Router} from 'express';
import UserService from '~/resources/user/user.service';
import {BadRequestException, NotFoundException} from '~/utils/exceptions';
import User from '~/entity/user.entity';

const UserController = Router();

/**
 * Create a user
 */
UserController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = new User();

    user.name = req.body.name ?? null;
    user.surname = req.body.surname ?? null;
    user.email = req.body.email ?? null;
    user.birth_date = req.body.birth_date ?? null;
    user.country = req.body.country ?? null;
    user.created_at = Date.now();
    user.validated = 0;
    // TODO: check how to create the password with passport.js

    if (user.name === null || user.email === null || user.password === null || user.surname === null) {
      throw new BadRequestException(`Missing properties to create a user`);
    }

    return res
      .status(200)
      .json(await UserService.createUser(user));
  } catch (e) {
    next(e);
  }
});

/**
 * Get a user
 */
UserController.get('/:user_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.findById(parseInt(req.params.user_id));
    if (user === null) {
      throw new NotFoundException(`User not found with id '${ req.params.user_id }'`);
    }

    return res
      .status(200)
      .json(user);
  } catch (e) {
    next(e);
  }
});

/**
 * Update a user
 */
UserController.patch('/:user_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!await UserService.exist(parseInt(req.params.user_id))) {
      throw new NotFoundException(`User not found with id '${ req.params.user_id }'`);
    }

    // Check password with passport.js


    // TODO: update user
  } catch (e) {
    next(e);
  }
});


UserController.get('/:user_id/answers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!await UserService.exist(parseInt(req.params.user_id))) {
      throw new NotFoundException(`User not found with id '${ req.params.user_id }'`);
    }

    return res
      .status(200)
      .json(await UserService.getUserAnswers(parseInt(req.params.user_id)));
  } catch (e) {
    next(e);
  }
});


