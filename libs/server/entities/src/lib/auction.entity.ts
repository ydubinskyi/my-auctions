import type { Relation } from 'typeorm';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { AbstractOrmEntity } from './base.entity';
import { LotEntity } from './lot.entity';
import { UserEntity } from './user.entity';

@Entity('auctions')
export class AuctionEntity extends AbstractOrmEntity {
  @Column({ type: 'timestamp', nullable: true })
  publishedAt!: Date | null;

  @Column()
  title!: string;

  @Column({ unique: true })
  @Index('auction_slug_index')
  slug!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @ManyToOne(() => UserEntity, (user) => user.auctions)
  seller!: Relation<UserEntity>;

  @OneToMany(() => LotEntity, (lot) => lot.auction, { cascade: true })
  lots!: Relation<LotEntity[]>;

  @Column({ type: 'timestamp' })
  startTime!: Date;

  @Column({ type: 'timestamp' })
  endTime!: Date;
}
