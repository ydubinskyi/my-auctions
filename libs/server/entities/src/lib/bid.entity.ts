import type { Relation } from 'typeorm';
import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractOrmEntity } from './base.entity';
import { LotEntity } from './lot.entity';
import { UserEntity } from './user.entity';

@Entity()
export class BidEntity extends AbstractOrmEntity {
  @ManyToOne(() => LotEntity)
  lot!: Relation<LotEntity>;

  @ManyToOne(() => UserEntity, (user) => user.bids)
  user!: Relation<UserEntity>;

  @Column({ type: 'decimal' })
  amount!: number;
}
