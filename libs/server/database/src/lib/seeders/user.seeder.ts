import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { UserEntity } from '@my-auctions/server/entities';

const USERS_TO_ADD = [
  {
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@example.com',
    password: 'admin',
    role: 'admin',
  },
] as Array<Partial<UserEntity>>;

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const repository = dataSource.getRepository(UserEntity);
    await repository.insert(USERS_TO_ADD);
  }
}
