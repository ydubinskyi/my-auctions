import type { Relation } from 'typeorm';
import { Column, Entity, Index, OneToMany } from 'typeorm';

import { hashString } from '@my-auctions/server/utils-common';

import { Auction } from './auction.entity';
import { BaseEntity } from './base.entity';
import { Bid } from './bid.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  @Index('user_email_index')
  email!: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: {
      to: (value: string) => {
        return hashString(value);
      },
      from: (value: string) => value,
    },
  })
  password!: string;

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
