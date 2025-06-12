import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

import * as entities from '@my-auctions/server/entities';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: Object.values(entities),
  synchronize: false,
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
};
