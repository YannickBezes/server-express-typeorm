import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {SnakeNamingStrategy} from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.db',
  synchronize: true,
  logging: false,
  entities: [ `${__dirname  }**/entity/*.entity{.ts,.js}`],
  migrations: ['migration/*.migration{.ts.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [], // Add listeners here https://typeorm.io/listeners-and-subscribers#
});
