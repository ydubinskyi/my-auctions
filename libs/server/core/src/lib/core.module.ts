import { Module } from '@nestjs/common';

import { DatabaseModule } from '@my-auctions/server/database';
import { AuthModule } from '@my-auctions/server/feat-auth';
import { UserModule } from '@my-auctions/server/feat-user';

import { HealthModule } from './health/health.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, HealthModule],
  controllers: [],
  providers: [],
  exports: [DatabaseModule, UserModule, AuthModule, HealthModule],
})
export class CoreModule {}
