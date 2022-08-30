import { DataSource } from 'typeorm';
import config from '../config';

const dbDataSource = new DataSource({
  type: 'postgres',
  port: config.db.port,
  host: config.db.host,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entities/*`],
  migrations: [`${__dirname}/migrations/*`],
});

export default dbDataSource;
