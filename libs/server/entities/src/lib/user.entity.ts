import type { Relation } from 'typeorm';
import { Column, Entity, OneToMany } from 'typeorm';

import { Auction } from './auction.entity';
import { BaseEntity } from './base.entity';
import { Bid } from './bid.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer',
  })
  role!: 'buyer' | 'seller' | 'admin';

  @OneToMany(() => Auction, (auction) => auction.seller)
  auctions!: Relation<Auction[]>;

  @OneToMany(() => Bid, (bid) => bid.user)
  bids!: Relation<Bid[]>;
}
