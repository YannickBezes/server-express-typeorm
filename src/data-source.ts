import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Pets } from './entity/Pets';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [Pets],
  migrations: [],
  subscribers: [],
});
