import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

import { typeOrmConfig } from './config/typeorm.config';
import UserSeeder from './seeders/user.seeder';

(async () => {
  const dataSource = new DataSource(typeOrmConfig);
  await dataSource.initialize();

  runSeeders(dataSource, {
    seeds: [UserSeeder],
  });
})();
