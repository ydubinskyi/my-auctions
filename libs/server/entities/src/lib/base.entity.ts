import {
  BaseEntity as BaseTypeormEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { IBaseEntity } from '@my-auctions/shared/types';

export abstract class AbstractOrmEntity
  extends BaseTypeormEntity
  implements IBaseEntity
{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @Exclude({ toPlainOnly: true })
  deletedAt!: Date | null;
}
