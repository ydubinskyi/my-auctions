import type { Relation } from 'typeorm';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lot } from './lot.entity';
import { User } from './user.entity';

@Entity()
export class Bid extends BaseEntity {
  @ManyToOne(() => Lot)
  lot!: Relation<Lot>;

  @ManyToOne(() => User, (user) => user.bids)
  user!: Relation<User>;

  @Column({ type: 'decimal' })
  amount!: number;
}
