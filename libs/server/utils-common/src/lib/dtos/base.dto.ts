import { ApiProperty } from '@nestjs/swagger';

import { IBaseEntity } from '@my-auctions/shared/types';
import { AbstractOrmEntity } from '@my-auctions/server/entities';

export type AbstractDtoOptions = Partial<{ excludeFields?: string[] }>;

export class AbstractDto implements IBaseEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({
    type: Date,
    nullable: true,
  })
  deletedAt!: Date | null;

  constructor(entity: AbstractOrmEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
