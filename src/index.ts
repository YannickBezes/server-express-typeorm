import cors from 'cors';
import express from 'express';
import { config } from '~/config';
import { PetsController } from '~/resources/pets/pets.controller';
import { ExceptionsHandler } from '~/middlewares/exceptions.handler';
import { UnknownRoutesHandler } from '~/middlewares/unknown-routes.handler';
// import {AppDataSource} from './data-source';
// import {Pets} from './entity/Pets';

const app = express();
app.use(express.json());
app.use(cors());


// AppDataSource.initialize().then(async () => {
//   console.log('Inserting a new user into the database...');
//   const user = new Pets();
//   user.firstName = 'Timber';
//   user.lastName = 'Saw';
//   user.age = 25;
//   await AppDataSource.manager.save(user);
//   console.log(`Saved a new user with id: ${  user.id}`);
//
//   console.log('Loading users from the database...');
//   const users = await AppDataSource.manager.find(Pets);
//   console.log('Loaded users: ', users);
//
//   console.log('Here you can setup and run express / fastify / any other framework.');
//
// }).catch(error => console.log(error));

/**
 * All CRUD routes for pets are prefixed by `/pets`
 */
app.use('/pets', PetsController);

/**
 * For all undefined routes we return an error
 */
app.all('*', UnknownRoutesHandler);

/**
 * Error Management
 * /!\ This need to be the last `app.use`
 */
app.use(ExceptionsHandler);

app.listen(config.API_PORT, () => console.log('Server on'));
