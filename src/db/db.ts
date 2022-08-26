import { DataSource } from 'typeorm';
import config from '../config';

const dbDataSource = new DataSource({
  type: 'postgres',
  port: config.dbPort,
  host: config.dbHost,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entities/*`],
  migrations: [`${__dirname}/migrations/*`]
})

export default dbDataSource;