import type { Relation } from 'typeorm';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { Auction } from './auction.entity';
import { BaseEntity } from './base.entity';
import { Bid } from './bid.entity';
import { Category } from './category.entity';
import { LotAttributeValue } from './lot-attribute-value.entity';

@Entity('lots')
export class Lot extends BaseEntity {
  @Column({ type: 'timestamp', nullable: true })
  publishedAt!: Date | null;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ unique: true })
  @Index('lot_slug_index')
  slug!: string;

  @Column({ type: 'decimal' })
  startPrice!: number;

  @ManyToOne(() => Auction, (auction) => auction.lots)
  @Index('lot_auctionId_index')
  auction!: Relation<Auction>;

  @ManyToOne(() => Category, (category) => category.lots)
  @Index('lot_categoryId_index')
  category!: Relation<Category>;

  @OneToMany(() => LotAttributeValue, (value) => value.lot, { cascade: true })
  attributes!: Relation<LotAttributeValue[]>;

  @OneToMany(() => Bid, (bid) => bid.lot, { cascade: true })
  bids!: Relation<Bid[]>;
}
