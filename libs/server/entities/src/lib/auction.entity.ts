import type { Relation } from 'typeorm';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Lot } from './lot.entity';
import { User } from './user.entity';

@Entity('auctions')
export class Auction extends BaseEntity {
  @Column({ type: 'timestamp', nullable: true })
  publishedAt!: Date | null;

  @Column()
  title!: string;

  @Column({ unique: true })
  @Index('auction_slug_index')
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @ManyToOne(() => User, (user) => user.auctions)
  seller!: Relation<User>;

  @OneToMany(() => Lot, (lot) => lot.auction, { cascade: true })
  lots!: Relation<Lot[]>;

  @Column({ type: 'timestamp' })
  startTime!: Date;

  @Column({ type: 'timestamp' })
  endTime!: Date;
}
