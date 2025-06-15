import { ApiProperty } from '@nestjs/swagger';

import { IPaginatedResponse } from '@my-auctions/shared/types';

import { PaginationMetaDto } from './pagination-meta.dto';

export class PaginationResponseDto<T> implements IPaginatedResponse<T> {
  @ApiProperty()
  meta: PaginationMetaDto;

  @ApiProperty()
  data: T[];

  constructor(data: T[], meta: PaginationMetaDto) {
    this.meta = meta;
    this.data = data;
  }
}
