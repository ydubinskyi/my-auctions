import { Module } from '@nestjs/common';

import { CoreModule } from '@my-auctions/server/core';

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
