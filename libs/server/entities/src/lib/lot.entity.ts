import type { Relation } from 'typeorm';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

import { AuctionEntity } from './auction.entity';
import { AbstractOrmEntity } from './base.entity';
import { BidEntity } from './bid.entity';
import { CategoryEntity } from './category.entity';
import { LotAttributeValueEntity } from './lot-attribute-value.entity';

@Entity('lots')
export class LotEntity extends AbstractOrmEntity {
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

  @ManyToOne(() => AuctionEntity, (auction) => auction.lots)
  @Index('lot_auctionId_index')
  auction!: Relation<AuctionEntity>;

  @ManyToOne(() => CategoryEntity, (category) => category.lots)
  @Index('lot_categoryId_index')
  category!: Relation<CategoryEntity>;

  @OneToMany(() => LotAttributeValueEntity, (value) => value.lot, {
    cascade: true,
  })
  attributes!: Relation<LotAttributeValueEntity[]>;

  @OneToMany(() => BidEntity, (bid) => bid.lot, { cascade: true })
  bids!: Relation<BidEntity[]>;
}
