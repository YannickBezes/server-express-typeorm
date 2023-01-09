import cors from 'cors';
import express from 'express';
import { config } from '~/config';
import ExceptionsHandler from '~/middlewares/exceptions.handler';
import UnknownRoutesHandler from '~/middlewares/unknown-routes.handler';
import {AppDataSource} from './data-source';
import CategoryController from '~/resources/category/category.controller';

const app = express();
app.use(express.json());
app.use(cors());

/**
 * All CRUD routes for pets are prefixed by `/pets`
 */
app.use('/category', CategoryController);

/**
 * For all undefined routes we return an error
 */
app.all('*', UnknownRoutesHandler);

/**
 * Error Management
 * /!\ This need to be the last `app.use`
 */
app.use(ExceptionsHandler);


AppDataSource.initialize().then(() => {
  app.listen(config.API_PORT, () => console.log('Server on !'));
}).catch(error => console.log(error));
